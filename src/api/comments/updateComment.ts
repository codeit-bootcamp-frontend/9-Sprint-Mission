import axios from "axios";
import { Comment } from "@/types/comment";

// 게시글 댓글 수정하기
export async function updateComment(
  commentId: number
): Promise<Comment | null> {
  try {
    const response = await axios.patch("/api/comments/updateComment", {
      commentId,
    });

    if (response.status === 200) {
      console.log("message: ", response.data.message);
      return response.data.comment;
    } else {
      console.error("게시글 댓글 수정 실패:", response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("addArticleComment 일반 에러:", error);
    throw error;
  }
}
