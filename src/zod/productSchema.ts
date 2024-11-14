import { z } from "zod";

export const productSchema = z.object({
  name: z.string(), // 상품명
  description: z.string(), // 상품 설명
  price: z.number(), // 가격
  tags: z.array(z.string()), // 태그 배열
  images: z.array(z.string()), // 이미지 배열
});

export type ProductSchema = z.infer<typeof productSchema>;
