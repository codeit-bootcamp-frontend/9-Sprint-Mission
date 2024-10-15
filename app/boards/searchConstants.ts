import { z } from "zod";

export const searchSchema = z.object({
  userSearch: z
    .string()
    .min(1, { message: "검색하시려면 검색어를 입력해주세요." })
    .regex(/([A-Za-zㄱ-ㅎ가-힣0-9])/, { message: "검색어에 특수문자는 사용할 수 없습니다." })
    .trim()
    .optional(),
});
