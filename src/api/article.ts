import axios from "./axios";

// 게시글 조회
export async function getArticles(params = {}) {
  const query = new URLSearchParams(params).toString();

  try {
    const response = axios.get(`/articles?${query}`);
    return (await response).data;
  } catch (error) {
    console.error("Failed to get articles:", error);
    throw error;
  }
}

// 게시글 등록
export async function postArticles() {
  try {
    // Authorization 헤더에 JWT 토큰 추가
    const response = await axios.post(
      "/articles",
      /*articleForm,*/ {
        headers: {
          //Authorization: `Bearer ${token}`, // JWT 토큰을 Bearer 형식으로 추가
        },
      }
    );
    return (await response).data;
  } catch (error) {
    console.error("Failed to post articles:", error);
    throw error;
  }
}

// 게시글 상세 조회
export async function getArticleDetail(articleId: number) {
  try {
    const response = axios.get(`/articles/${articleId}`);
    return (await response).data;
  } catch (error) {
    console.error("Failed to get article detail:", error);
    throw error;
  }
}

// 게시글 댓글 조회
export async function getArticleComments({
  articleId,
  limit,
  cursor,
}: {
  articleId: number;
  limit: number;
  cursor?: number | null;
}) {
  try {
    const response = axios.get(`/articles/${articleId}/comments`, {
      params: {
        limit,
        cursor,
      },
    });
    return (await response).data;
  } catch (error) {
    console.error("Failed to get article comments:", error);
    throw error;
  }
}

// 게시글 댓글 등록
export async function postArticleComments(articleId: number, content: string) {
  try {
    const response = await axios.post(
      `/articles/${articleId}/comments`,
      { content },
      {
        headers: {
          //Authorization: `Bearer ${token}`, // JWT 토큰을 Bearer 형식으로 추가
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to post article comments:", error);
    throw error;
  }
}
