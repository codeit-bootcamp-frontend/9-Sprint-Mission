import axios from "axios";
import { Article, ArticleForm } from "@/types/article";

// 게시글 등록하기
export async function addArticle(
  articleForm: ArticleForm
): Promise<Article | null> {
  try {
    // 이미지가 없으면 빈 문자열로 설정
    if (!articleForm.image) articleForm.image = "";

    const response = await axios.post("/api/articles/addArticle", articleForm);

    if (response.status === 200) {
      console.log("message: ", response.data.message);
      return response.data.article;
    } else {
      console.error("게시글 등록 실패:", response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("addArticle 일반 에러:", error);
    throw error;
  }
}
