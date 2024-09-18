export interface ItemFormValues {
  imgFile: File | null;
  title: string;
  content: string;
  price: string;
  tags: { id: number; value: string }[];
}

export interface Product {
  id?: number;
  name?: string;
  description?: string;
  price: number;
  favoriteCount?: number;
  images: string;
  tags?: string[];
}

export interface CommentData {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image: string;
  };
}

export interface ProductDetailsProps {
  datas: Product;
  id: string | number;
}

export interface PaginationProps {
  page: number;
  totalPages: number;
  pageLimit?: number;
  onPageChange: (page: number) => void;
}
