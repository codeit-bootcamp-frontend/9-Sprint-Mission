import { z } from "zod";

const tagSchema = z.object({
  tag: z.union([z.string(), z.number()])
});

export const addItemSchema = z.object({
  itemImg: z.string().nullable(),
  itemName: z.string().min(1, { message: "상품명을 입력해주세요." }).regex(/([A-Za-zㄱ-ㅎ가-힣0-9])/, { message: "상품명에 특수문자는 사용할 수 없습니다." }).trim(),
  itemDescription: z.string().min(1, { message: "상품 소개를 입력해주세요." }),
  itemPrice: z.string().min(1, { message: "상품가격을 입력해주세요." }),
  itemTag: z.array(tagSchema).optional().default([])
});