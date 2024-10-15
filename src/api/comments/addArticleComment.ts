import axios from "axios";
import { Comment } from "@/types/comment";

// 게시글 댓글 등록하기
export async function addArticleComment({
  articleId,
  content,
}: {
  articleId: number;
  content: string;
}): Promise<Comment | null> {
  try {
    const response = await axios.post("/api/comments/addArticleComment", {
      articleId,
      content,
    });

    if (response.status === 200) {
      console.log("message: ", response.data.message);
      return response.data.comment;
    } else {
      console.error("게시글 댓글 등록 실패:", response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("addArticleComment 일반 에러:", error);
    throw error;
  }
}
