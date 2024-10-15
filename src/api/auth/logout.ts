import axios from "axios";

export const logout = async (redirectToSignIn: () => void) => {
  try {
    const response = await axios.post("/api/auth/logout"); // Next.js API Route 호출

    if (response.status !== 200) {
      throw new Error("로그아웃 중 오류 발생 status: " + response.status);
    }

    // 로그아웃 후 signIn 페이지로 리다이렉션
    redirectToSignIn();
  } catch (error) {
    console.error("로그아웃 중 오류 발생:", error);
    throw new Error("로그아웃 요청에 실패했습니다.");
  }

  return null;
};
