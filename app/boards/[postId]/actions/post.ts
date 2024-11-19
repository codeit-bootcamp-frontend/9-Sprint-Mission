"use server";

export const getPostItem = async (postId: number) => {
  if (!postId) return null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return { error: "게시글 조회 실패" };
    }

    return await response.json();
  } catch (error) {
    console.error("게시글 조회 실패", error);
    return { error: "게시글 조회 실패" };
  }
};
