// 상품 타입 정의(list)
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: string; // 날짜는 ISO 문자열 형태
  favoriteCount: number;
  ownerId: number;
  images: string[]; // 이미지 배열
  tags: string[]; // 태그 배열
}

// 특정 상품 타입 정의(id, detail)
export interface ProductDetail extends Product {
  isFavorite: boolean; // 좋아요 여부 (list에 없는 항목)
}

// API에서 반환되는 응답 타입 정의(list)
export interface ProductResponse {
  totalCount: number;
  list: Product[];
}
