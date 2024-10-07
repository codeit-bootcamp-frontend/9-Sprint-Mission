import { z } from "zod";

export const postCommentSchema = z.object({
  postComment: z
    .string()
    .min(1, { message: "댓글을 입력해주세요." })
    .trim()
});
