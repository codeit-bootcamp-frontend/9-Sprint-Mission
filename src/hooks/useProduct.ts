import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { Product, ProductDetail, ProductListResponse } from "@/types/product";
import { ProductSchema } from "@/zod/productSchema";
import { ProductSortOption } from "@/constants/ProductSortOption";

export const useProduct = () => {
  const queryClient = useQueryClient();

  // 상품 목록 조회
  const useProducts = ({
    page,
    pageSize,
    orderBy,
    keyword,
    enabled = true,
  }: {
    page: number;
    pageSize: number;
    orderBy: ProductSortOption;
    keyword?: string;
    enabled?: boolean;
  }): UseQueryResult<ProductListResponse> => {
    return useQuery({
      queryKey: ["products", { page, pageSize, orderBy, keyword }],
      queryFn: async () => {
        const params: Record<string, unknown> = { page, pageSize, orderBy };
        if (keyword) params.keyword = keyword;
        const response = await axios.get<ProductListResponse>("/api/products", { params });
        return response.data;
      },
      enabled,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    });
  };

  // 상품 상세 조회
  const useProductDetail = (productId: number): UseQueryResult<ProductDetail> => {
    return useQuery({
      queryKey: ["product", productId],
      queryFn: async () => {
        const response = await axios.get(`/api/products/${productId}`);
        return response.data;
      },
      enabled: !!productId,
    });
  };

  // 상품 등록
  const addProductMutation = useMutation({
    mutationFn: async (productForm: ProductSchema) => {
      const response = await axios.post<{ product: Product; message: string }>("/api/products", productForm);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // 상품 수정
  const updateProductMutation = useMutation({
    mutationFn: async ({ productId, productForm }: { productId: number; productForm: ProductSchema }) => {
      const response = await axios.patch(`/api/products/${productId}`, productForm);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.productId] });
    },
  });

  // 상품 삭제
  const removeProductMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await axios.delete(`/api/products/${productId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // 상품 좋아요
  const addFavoriteMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await axios.post(`/api/products/${productId}/favorite`, {
        productId,
      });
      return response.data;
    },
    onSuccess: (_, productId) => {
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
    },
  });

  // 상품 좋아요 취소
  const removeFavoriteMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await axios.delete(`/api/products/${productId}/favorite`, {
        data: { productId },
      });
      return response.data;
    },
    onSuccess: (_, productId) => {
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
    },
  });

  return {
    // 쿼리 훅
    useProducts,
    useProductDetail,

    // 뮤테이션 함수들
    addProduct: addProductMutation.mutateAsync,
    updateProduct: updateProductMutation.mutateAsync,
    removeProduct: removeProductMutation.mutateAsync,
    addFavorite: addFavoriteMutation.mutateAsync,
    removeFavorite: removeFavoriteMutation.mutateAsync,

    // 로딩 상태
    isLoading: {
      add: addProductMutation.isPending,
      update: updateProductMutation.isPending,
      remove: removeProductMutation.isPending,
      addFavorite: addFavoriteMutation.isPending,
      removeFavorite: removeFavoriteMutation.isPending,
    },

    // 에러 상태
    error: {
      add: addProductMutation.error,
      update: updateProductMutation.error,
      remove: removeProductMutation.error,
      addFavorite: addFavoriteMutation.error,
      removeFavorite: removeFavoriteMutation.error,
    },
  };
};
