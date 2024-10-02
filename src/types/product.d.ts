// src/types/product.d.ts
// 상품의 기본 정보 인터페이스
export interface Product {
  createdAt: Date; // 생성일
  favoriteCount: number; // 좋아요 수
  ownerNickname?: string; // 소유자 닉네임 (선택적)
  ownerId: number; // 소유자 ID
  images: string[]; // 이미지 배열
  tags: string[]; // 태그 배열
  price: number; // 가격
  description: string; // 상품 설명
  name: string; // 상품명
  id: number; // 상품 ID
}

// 상품 상세 정보 인터페이스 (기본 상품 정보 + 추가 속성)
export interface ProductDetail extends Product {
  isFavorite: boolean; // 로그인한 사용자가 좋아요한 상품인지 여부
}

// 상품 목록 응답 인터페이스
export interface ProductListResponse {
  totalCount: number; // 전체 상품 개수
  list: Product[]; // 상품 리스트
}

// 정렬 옵션 타입
export type ProductSortOption = "recent" | "favorite"; // 최근 등록순 or 좋아요 순
