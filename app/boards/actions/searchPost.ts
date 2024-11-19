"use server";

import { searchSchema } from "@/components/zodSchema/SearchSchema";

export const searchPost = async (formData: FormData) => {
  const search = formData.get("userSearch");

  const parsedSearch = searchSchema.safeParse({ userSearch: search });

  if (!parsedSearch.success) {
    return { error: "검색어가 올바르지 않습니다." };
  } else {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles?keyword=${search}`, {
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
  }
};
