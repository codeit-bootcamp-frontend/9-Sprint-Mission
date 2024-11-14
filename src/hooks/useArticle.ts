import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Article, ArticleDetail, ArticleListResponse } from "@/types/article";
import { ArticleSchema } from "@/zod/articleSchema";
import { ArticleSortOption } from "@/types/article";

export const useArticle = () => {
  const queryClient = useQueryClient();

  // 게시글 목록 조회 (페이지네이션)
  const useArticles = ({
    page,
    pageSize,
    orderBy,
    keyword,
  }: {
    page: number;
    pageSize: number;
    orderBy: ArticleSortOption;
    keyword?: string;
  }) => {
    return useQuery({
      queryKey: ["articles", { page, pageSize, orderBy, keyword }],
      queryFn: async () => {
        const params: Record<string, unknown> = { page, pageSize, orderBy };
        if (keyword) params.keyword = keyword;
        const response = await axios.get<ArticleListResponse>("/api/articles", { params });
        return response.data;
      },
    });
  };

  // 게시글 상세 조회
  const useArticleDetail = (articleId: number) => {
    return useQuery({
      queryKey: ["article", articleId],
      queryFn: async () => {
        const response = await axios.get<ArticleDetail>(`/api/articles/${articleId}`);
        return response.data;
      },
      enabled: !!articleId,
    });
  };

  // 게시글 등록
  const addArticleMutation = useMutation({
    mutationFn: async (articleForm: ArticleSchema) => {
      if (!articleForm.image) articleForm.image = "";
      const response = await axios.post<{ article: Article; message: string }>("/api/articles", articleForm);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  // 게시글 수정
  const updateArticleMutation = useMutation({
    mutationFn: async ({ articleId, articleForm }: { articleId: number; articleForm: ArticleSchema }) => {
      const response = await axios.patch(`/api/articles/${articleId}`, articleForm);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["article", variables.articleId] });
    },
  });

  // 게시글 삭제
  const removeArticleMutation = useMutation({
    mutationFn: async (articleId: number) => {
      const response = await axios.delete(`/api/articles/${articleId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  // 게시글 좋아요
  const addLikeMutation = useMutation({
    mutationFn: async (articleId: number) => {
      const { data } = await axios.post(`/api/articles/${articleId}/like`);
      return data;
    },
    onSuccess: (_, articleId) => {
      queryClient.invalidateQueries({ queryKey: ["article", articleId] });
    },
    onError: (error) => {
      console.error("좋아요 추가 실패:", error);
      throw error;
    },
  });

  // 게시글 좋아요 취소
  const removeLikeMutation = useMutation({
    mutationFn: async (articleId: number) => {
      const response = await axios.delete(`/api/articles/${articleId}/like`);
      return response.data;
    },
    onSuccess: (_, articleId) => {
      queryClient.invalidateQueries({ queryKey: ["article", articleId] });
    },
    onError: (error) => {
      console.error("좋아요 취소 실패:", error);
      throw error;
    },
  });

  return {
    // 쿼리 훅
    useArticles,
    useArticleDetail,

    // 뮤테이션 함수들
    addArticle: addArticleMutation.mutateAsync,
    updateArticle: updateArticleMutation.mutateAsync,
    removeArticle: removeArticleMutation.mutateAsync,
    addLike: addLikeMutation.mutate,
    removeLike: removeLikeMutation.mutate,

    // 로딩 상태
    isLoading: {
      add: addArticleMutation.isPending,
      update: updateArticleMutation.isPending,
      remove: removeArticleMutation.isPending,
      addLike: addLikeMutation.isPending,
      removeLike: removeLikeMutation.isPending,
    },

    // 에러 상태
    error: {
      add: addArticleMutation.error,
      update: updateArticleMutation.error,
      remove: removeArticleMutation.error,
      addLike: addLikeMutation.error,
      removeLike: removeLikeMutation.error,
    },
  };
};
