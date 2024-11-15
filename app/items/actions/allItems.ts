export const getAllItems = async (pageSize: number, orderBy: string, page: number) => {
  if (pageSize === 0) return { list: [], totalCount: 0 };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?pageSize=${pageSize}&orderBy=${orderBy}&page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
    });

    if (!response.ok) {
      return { error: "전체 상품 조회 실패" };
    }

    return await response.json();
  } catch (error) {
    console.error("전체 상품 조회 실패", error);
    return { error: "전체 상품 조회 실패" };
  }
};