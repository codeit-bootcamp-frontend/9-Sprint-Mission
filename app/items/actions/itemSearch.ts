export const itemSearch = async (formData: FormData) => { 
  const keyword = formData.get("keyword");
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?keyword=${keyword}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) { 
      return { error: "상품 조회 실패" };
    }

    return await response.json();
  } catch (error) {
    console.error("상품 조회 실패", error);
    return { error: "상품 조회 실패" };
  }
}