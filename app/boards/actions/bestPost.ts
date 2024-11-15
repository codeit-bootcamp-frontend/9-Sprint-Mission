"use server";

export const getBestPost = async (pageSize: number) => {
  if (pageSize === 0) return [];

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles?pageSize=${pageSize}&orderBy=like`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
      next: { revalidate: 10 },
    });

    if (!response.ok) { 
      return { error: "베스트 게시글 조회 실패" };
    }

    return await response.json();
  } catch (error) {
    console.error("베스트 게시글 조회 실패", error);
    return { error: "베스트 게시글 조회 실패" };
  }
}