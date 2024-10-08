import axios from "axios";
import { ArticleDetail } from "@/types/article";

export async function removeArticleLike(
  articleId: number
): Promise<ArticleDetail | null> {
  try {
    const response = await axios.delete("/api/articles/removeArticleLike", {
      data: { articleId },
    });
    if (response.status === 200) {
      console.log("message: ", response.data.message);
      return response.data.articleDetail;
    } else {
      console.error("게시글 좋아요 취소 실패:", response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("removeArticleLike 일반 에러:", error);
    throw error;
  }
}
