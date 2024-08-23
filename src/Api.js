const BASE_URL = "https://panda-market-api.vercel.app/products";
export async function getProducts(page, pageSize, order) {
  try {
    const response = await fetch(
      `${BASE_URL}?page=${page}&pageSize=${pageSize}&orderBy=${order}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

// AddItem 데이터 보내기
export async function createAddItem(formData) {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("상품을 등록하는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

export async function createComments(productId, commentText) {
  try {
    const response = await fetch(`${BASE_URL}/${productId}/comments`, {
      method: "POST", // HTTP 메서드 설정
      headers: {
        "Content-Type": "application/json", // 요청 본문이 JSON 형식임을 서버에 알림
      },
      body: JSON.stringify({
        content: commentText, // 서버에 전송할 데이터
      }),
    });

    if (!response.ok) {
      // HTTP 응답 상태가 성공적이지 않은 경우 예외를 발생시킵니다.
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // 서버 응답을 JSON으로 파싱합니다.
    console.log("댓글 업로드됨", data);
  } catch (error) {
    // 오류가 발생한 경우, 오류 메시지를 콘솔에 출력합니다.
    console.error("상세페이지 댓글 onSubmit POST 요청에서 오류 발생", error);
  }
}
