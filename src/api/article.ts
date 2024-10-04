// src/api/article.ts
import axiosInstance from "./axiosConfig";
import { AxiosError } from "axios";
import {
  Article,
  ArticleDetail,
  ArticleForm,
  ArticleListResponse,
  ArticleSortOption,
} from "@/types/article";
import { Comment, CommentListResponse } from "@/types/comment";

// 게시글 등록하기
export async function addArticle(
  articleForm: ArticleForm,
  token: string
): Promise<Article> {
  try {
    // 이미지가 없으면 빈 문자열로 설정
    if (!articleForm.image) articleForm.image = "";

    // Authorization 헤더에 JWT 토큰 추가
    const response = await axiosInstance.post<Article>(
      "/articles",
      articleForm,
      {
        headers: {
          Authorization: `Bearer ${token}`, // JWT 토큰을 Bearer 형식으로 추가
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // Axios 에러인 경우 처리
      console.error(
        "addArticle API 요청 에러:",
        error.response?.data || error.message
      );
    } else if (error instanceof Error) {
      // 일반 에러 처리
      console.error("addArticle 일반 에러:", error.message);
    } else {
      console.error("addArticle 알 수 없는 오류:", error);
    }
    throw error;
  }
}

// 게시글 목록 가져오기
export async function getArticles({
  page,
  pageSize,
  orderBy,
  keyword,
}: {
  page: number;
  pageSize: number;
  orderBy: ArticleSortOption;
  keyword?: string;
}): Promise<ArticleListResponse> {
  try {
    // keyword가 없으면 params에서 제외
    const params: Record<string, unknown> = { page, pageSize, orderBy };
    if (keyword) params.keyword = keyword;

    const response = await axiosInstance.get<ArticleListResponse>("/articles", {
      params,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // Axios 에러인 경우 처리
      console.error(
        "getArticles API 요청 에러:",
        error.response?.data || error.message
      );
    } else if (error instanceof Error) {
      // 일반 에러 처리
      console.error("getArticles 일반 에러:", error.message);
    } else {
      console.error("getArticles 알 수 없는 오류:", error);
    }
    throw error;
  }
}

// 게시글 상세 정보 가져오기
export async function getArticleDetail(
  articleId: number
): Promise<ArticleDetail> {
  if (!articleId) {
    throw new Error("Invalid article ID");
  }

  try {
    const response = await axiosInstance.get<ArticleDetail>(
      `/articles/${articleId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // Axios 에러인 경우 처리
      console.error(
        "getArticleDetail API 요청 에러:",
        error.response?.data || error.message
      );
    } else if (error instanceof Error) {
      // 일반 에러 처리
      console.error("getArticleDetail 일반 에러:", error.message);
    } else {
      console.error("getArticleDetail 알 수 없는 오류:", error);
    }
    throw error;
  }
}

// 게시글 좋아요 추가
export async function addArticleLike(
  articleId: number,
  token: string
): Promise<ArticleDetail> {
  try {
    // Authorization 헤더에 JWT 토큰 추가
    const response = await axiosInstance.post<ArticleDetail>(
      `/articles/${articleId}/like`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // JWT 토큰을 Bearer 형식으로 추가
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // Axios 에러인 경우 처리
      console.error(
        "addArticleLike API 요청 에러:",
        error.response?.data || error.message
      );
    } else if (error instanceof Error) {
      // 일반 에러 처리
      console.error("addArticleLike 일반 에러:", error.message);
    } else {
      console.error("addArticleLike 알 수 없는 오류:", error);
    }
    throw error; // 에러를 다시 throw하여 상위에서 처리할 수 있도록
  }
}

// 게시글 좋아요 취소
export async function removeArticleLike(
  articleId: number,
  token: string
): Promise<ArticleDetail> {
  try {
    // Authorization 헤더에 JWT 토큰 추가
    const response = await axiosInstance.delete<ArticleDetail>(
      `/articles/${articleId}/like`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // JWT 토큰을 Bearer 형식으로 추가
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // Axios 에러인 경우 처리
      console.error(
        "removeArticleLike API 요청 에러:",
        error.response?.data || error.message
      );
    } else if (error instanceof Error) {
      // 일반 에러 처리
      console.error("removeArticleLike 일반 에러:", error.message);
    } else {
      console.error("removeArticleLike 알 수 없는 오류:", error);
    }
    throw error; // 에러를 다시 throw하여 상위에서 처리할 수 있도록
  }
}

// 게시글 댓글 등록하기
export async function addArticleComment(
  articleId: number,
  content: string,
  token: string
): Promise<Comment> {
  try {
    // Authorization 헤더에 JWT 토큰 추가
    const response = await axiosInstance.post<Comment>(
      `/articles/${articleId}/comments`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`, // JWT 토큰을 Bearer 형식으로 추가
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // Axios 에러인 경우 처리
      console.error(
        "addArticleComment API 요청 에러:",
        error.response?.data || error.message
      );
    } else if (error instanceof Error) {
      // 일반 에러 처리
      console.error("addArticleComment 일반 에러:", error.message);
    } else {
      console.error("addArticleComment 알 수 없는 오류:", error);
    }
    throw error; // 에러를 다시 throw하여 상위에서 처리할 수 있도록
  }
}

// 게시글에 대한 댓글 가져오기
export async function getArticleComments({
  articleId,
  limit,
  cursor,
}: {
  articleId: number;
  limit: number;
  cursor?: number | null;
}): Promise<CommentListResponse> {
  if (!articleId) {
    throw new Error("Invalid article ID");
  }

  try {
    const response = await axiosInstance.get<CommentListResponse>(
      `/articles/${articleId}/comments`,
      {
        params: {
          limit,
          cursor,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // Axios 에러인 경우 처리
      console.error(
        "getArticleComments API 요청 에러:",
        error.response?.data || error.message
      );
    } else if (error instanceof Error) {
      // 일반 에러 처리
      console.error("getArticleComments 일반 에러:", error.message);
    } else {
      console.error("getArticleComments 알 수 없는 오류:", error);
    }
    throw error;
  }
}
