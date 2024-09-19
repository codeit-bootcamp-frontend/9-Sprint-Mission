import * as z from "zod";

export const ContactSchema = z.object({
  content: z.string().min(1, { message: "내용을 입력해주세요." })
});