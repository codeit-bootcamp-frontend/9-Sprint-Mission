import axios from "axios";
import { ArticleDetail } from "@/types/article";

export async function addArticleLike(
  articleId: number
): Promise<ArticleDetail | null> {
  try {
    // Authorization 헤더에 JWT 토큰 추가
    const response = await axios.post("/api/articles/addArticleLike", {
      articleId,
    });
    if (response.status === 200) {
      console.log("message: ", response.data.message);
      return response.data.articleDetail;
    } else {
      console.error("게시글 등록 실패:", response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("addArticle 일반 에러:", error);
    throw error;
  }
}
