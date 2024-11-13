import { useMutation, useQueryClient, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Comment, CommentListResponse } from "@/types/comment";

export const useComment = () => {
  const queryClient = useQueryClient();

  // 댓글 목록 조회 (무한 스크롤)
  const useInfiniteComments = ({
    productId,
    articleId,
    limit = 10,
    enabled = true,
  }: {
    productId?: number;
    articleId?: number;
    limit?: number;
    enabled?: boolean;
  }) => {
    return useInfiniteQuery<CommentListResponse>({
      queryKey: ["comments", { productId, articleId, limit }],
      queryFn: async ({ pageParam = null }) => {
        const params: Record<string, unknown> = {
          cursor: pageParam,
          limit,
        };

        let url = "/api/comments";
        if (productId) {
          url = `/api/products/${productId}/comments`;
        } else if (articleId) {
          url = `/api/articles/${articleId}/comments`;
        }

        const response = await axios.get<CommentListResponse>(url, { params });
        return response.data;
      },
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
      enabled,
    });
  };

  // 댓글 상세 조회
  const useCommentDetail = (commentId: number) => {
    return useQuery({
      queryKey: ["comment", commentId],
      queryFn: async () => {
        const response = await axios.get<Comment>(`/api/comments/${commentId}`);
        return response.data;
      },
      enabled: !!commentId,
    });
  };

  // 상품 댓글 등록
  const addProductCommentMutation = useMutation({
    mutationFn: async ({ productId, content }: { productId: number; content: string }) => {
      const response = await axios.post<{ comment: Comment; message: string }>(`/api/products/${productId}/comments`, {
        content,
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments", { productId: variables.productId }] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.productId] });
    },
  });

  // 게시글 댓글 등록
  const addArticleCommentMutation = useMutation({
    mutationFn: async ({ articleId, content }: { articleId: number; content: string }) => {
      const response = await axios.post<{ comment: Comment; message: string }>(`/api/articles/${articleId}/comments`, {
        content,
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments", { articleId: variables.articleId }] });
      queryClient.invalidateQueries({ queryKey: ["article", variables.articleId] });
    },
  });

  // 댓글 수정
  const updateCommentMutation = useMutation({
    mutationFn: async ({ commentId, content }: { commentId: number; content: string }) => {
      const response = await axios.patch(`/api/comments/${commentId}`, { content });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["comment", variables.commentId] });
    },
  });

  // 댓글 삭제
  const removeCommentMutation = useMutation({
    mutationFn: async (commentId: number) => {
      const response = await axios.delete(`/api/comments/${commentId}`);
      return response.data;
    },
    onSuccess: (_, commentId) => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["comment", commentId] });
    },
  });

  return {
    // 쿼리 훅
    useInfiniteComments,
    useCommentDetail,

    // 뮤테이션 함수들
    addProductComment: addProductCommentMutation.mutateAsync,
    addArticleComment: addArticleCommentMutation.mutateAsync,
    updateComment: updateCommentMutation.mutateAsync,
    removeComment: removeCommentMutation.mutateAsync,

    // 로딩 상태
    isLoading: {
      addProduct: addProductCommentMutation.isPending,
      addArticle: addArticleCommentMutation.isPending,
      update: updateCommentMutation.isPending,
      remove: removeCommentMutation.isPending,
    },

    // 에러 상태
    error: {
      addProduct: addProductCommentMutation.error,
      addArticle: addArticleCommentMutation.error,
      update: updateCommentMutation.error,
      remove: removeCommentMutation.error,
    },
  };
};
