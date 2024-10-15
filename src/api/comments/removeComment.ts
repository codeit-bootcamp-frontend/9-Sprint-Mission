import axios from "axios";

export async function removeComment(commentId: number): Promise<number | null> {
  try {
    // Authorization 헤더에 JWT 토큰 추가
    const response = await axios.delete("/api/comments/removeComment", {
      params: {
        commentId,
      },
    });
    if (response.status === 200) {
      console.log("message: ", response.data.message);
      return response.data.id;
    } else {
      console.error("게시글 댓글 삭제 실패:", response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("removeArticleLike 일반 에러:", error);
    throw error;
  }
}
