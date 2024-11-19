"use server";

export const getBestItems = async (pageSize: number) => {
  if (pageSize === 0) return [];

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?pageSize=${pageSize}&orderBy=favorite`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
    });

    if (!response.ok) {
      return { error: "베스트 상품 조회 실패" };
    }

    return await response.json();
  } catch (error) {
    console.error("베스트 상품 조회 실패", error);
    return { error: "베스트 상품 조회 실패" };
  }
};
