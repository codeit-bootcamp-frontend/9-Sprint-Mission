import { z } from "zod";

export const addBoardSchema = z.object({
  postTitle: z
    .string()
    .min(1, { message: "제목을 확인해주세요." })
    .regex(/([A-Za-zㄱ-ㅎ가-힣0-9])/, { message: "제목에 특수문자는 사용할 수 없습니다." })
    .trim(),
  post: z.string().min(1, { message: "내용을 확인해주세요." }),
  postImg: z.instanceof(File).refine((file) => file.size < 5 * 1024 * 1024, { message: "파일은 5MB를 넘을 수 없습니다." }).nullable()
});
