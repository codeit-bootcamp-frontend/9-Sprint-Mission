import { z } from "zod";

const TagConstants = z.object({
  tag: z.union([z.string(), z.number()])
});

export const AdditemConstants = z.object({
  images: z.instanceof(File).refine((file) => file.size < 2 * 1024 * 1024, { message: "파일은 2MB를 넘을 수 없습니다." }).optional(),
  name: z.string().min(1, { message: "상품명을 입력해주세요." }).trim(),
  description: z.string().min(1, { message: "상품 소개를 입력해주세요." }),
  price: z.string().min(1, { message: "판매 가격을 입력해주세요." }),
  tags: z.array(TagConstants).optional()
});