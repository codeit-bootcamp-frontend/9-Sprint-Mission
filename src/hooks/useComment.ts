import { useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Comment, CommentListResponse } from "@/types/comment";

export const useComment = () => {
  const queryClient = useQueryClient();

  // 상품 댓글 목록 조회 (무한 스크롤)
  const useProductComments = (productId: number) => {
    return useInfiniteQuery<CommentListResponse>({
      queryKey: ["productComments", productId],
      queryFn: async ({ pageParam = null }) => {
        const response = await axios.get<CommentListResponse>("/api/comments/getProductComments", {
          params: {
            productId,
            cursor: pageParam,
            limit: 10,
          },
        });
        return response.data;
      },
      initialPageParam: null,
      getNextPageParam: (lastPage: CommentListResponse) => lastPage.nextCursor || undefined,
    });
  };

  // 게시글 댓글 목록 조회 (무한 스크롤)
  const useArticleComments = (articleId: number) => {
    return useInfiniteQuery<CommentListResponse>({
      queryKey: ["articleComments", articleId],
      queryFn: async ({ pageParam = null }) => {
        const response = await axios.get<CommentListResponse>("/api/comments/getArticleComments", {
          params: {
            articleId,
            cursor: pageParam,
            limit: 10,
          },
        });
        return response.data;
      },
      initialPageParam: null,
      getNextPageParam: (lastPage: CommentListResponse) => lastPage.nextCursor || undefined,
    });
  };

  // 상품 댓글 등록
  const addProductCommentMutation = useMutation({
    mutationFn: async ({ productId, content }: { productId: number; content: string }) => {
      const response = await axios.post<{ comment: Comment; message: string }>("/api/comments/addProductComment", {
        productId,
        content,
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["productComments", variables.productId] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.productId] });
    },
  });

  // 게시글 댓글 등록
  const addArticleCommentMutation = useMutation({
    mutationFn: async ({ articleId, content }: { articleId: number; content: string }) => {
      const response = await axios.post<{ comment: Comment; message: string }>("/api/comments/addArticleComment", {
        articleId,
        content,
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["articleComments", variables.articleId] });
      queryClient.invalidateQueries({ queryKey: ["article", variables.articleId] });
    },
  });

  // 댓글 수정
  const updateCommentMutation = useMutation({
    mutationFn: async ({ commentId, content }: { commentId: number; content: string }) => {
      const response = await axios.patch("/api/comments/updateComment", { commentId, content });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productComments"] });
      queryClient.invalidateQueries({ queryKey: ["articleComments"] });
    },
  });

  // 댓글 삭제
  const removeCommentMutation = useMutation({
    mutationFn: async (commentId: number) => {
      const response = await axios.delete("/api/comments/removeComment", {
        data: { commentId },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productComments"] });
      queryClient.invalidateQueries({ queryKey: ["articleComments"] });
    },
  });

  return {
    // 쿼리 훅
    useProductComments,
    useArticleComments,

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
