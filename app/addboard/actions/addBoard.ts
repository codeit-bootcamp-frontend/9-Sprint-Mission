"use server";

import { addBoardSchema } from "../zodSchema/AddBoardSchema";

export const addBoard = async (formData: FormData, accessToken: string) => {
  const data = {
    postTitle: formData.get("title"),
    post: formData.get("content"),
    postImg: formData.get("image"),
  };

  if (!data.postTitle || !data.post || !data.postImg) {
    return { error: "입력한 내용을 다시 확인해주세요." };
  }

  const parsedData = addBoardSchema.safeParse(data);

  if (!parsedData.success) {
    return { error: "게시글 검증 실패" };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`, {
      method: "POST",
      body: JSON.stringify({
        title: data.postTitle,
        content: data.post,
        image: data.postImg,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return { error: "게시글 등록 실패" };
    }

    return await response.json();
  } catch (error) {
    console.error("게시글 등록 실패", error);
    return { error: "게시글 등록 실패" };
  }
};
