import axios from "./axios";

// 게시글 조회
export async function getArticles({
  page,
  pageSize,
  orderBy,
  keyword,
}: {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  keyword?: string;
}) {
  try {
    const response = await axios.get("/articles", {
      params: {
        page,
        pageSize,
        orderBy,
        keyword,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get articles:", error);
    throw error;
  }
}

// 게시글 등록
export async function postArticles() {
  try {
    const response = await axios.post("/articles", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to post articles:", error);
    throw error;
  }
}

// 게시글 상세 조회
export async function getArticleDetail(articleId: number) {
  try {
    const response = await axios.get(`/articles/${articleId}`);
    return response.data;
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
  cursor?: number;
}) {
  try {
    const response = await axios.get(`/articles/${articleId}/comments`, {
      params: {
        limit,
        cursor,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get article comments:", error);
    throw error;
  }
}

// 게시글 댓글 등록
export async function postArticleComments({
  articleId,
  content,
}: {
  articleId: number;
  content: string;
}) {
  try {
    const response = await axios.post(
      `/articles/${articleId}/comments`,
      { content },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to post article comments:", error);
    throw error;
  }
}

// 게시글 댓글 수정
export async function patchArticleComments({
  commentId,
  content,
}: {
  commentId: number;
  content: string;
}) {
  try {
    const response = await axios.patch(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to patch article comments:", error);
    throw error;
  }
}
