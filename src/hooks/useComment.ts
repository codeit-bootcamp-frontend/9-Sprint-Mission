import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Comment } from "@/types/comment";

export const useComment = () => {
  const queryClient = useQueryClient();

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
      // 상품 상세 데이터 갱신
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
      // 게시글 상세 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ["article", variables.articleId] });
    },
  });

  // 댓글 수정
  const updateCommentMutation = useMutation({
    mutationFn: async ({ commentId, content }: { commentId: number; content: string }) => {
      const response = await axios.patch("/api/comments/updateComment", {
        commentId,
        content,
      });
      return response.data;
    },
    onSuccess: () => {
      // 관련된 상품/게시글 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ["product"] });
      queryClient.invalidateQueries({ queryKey: ["article"] });
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
      // 관련된 상품/게시글 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ["product"] });
      queryClient.invalidateQueries({ queryKey: ["article"] });
    },
  });

  return {
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
