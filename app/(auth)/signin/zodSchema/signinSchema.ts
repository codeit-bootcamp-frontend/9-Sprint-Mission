import { z } from "zod";

export const signinSchema = z.object({
  userEmail: z.string().email({ message: "잘못된 이메일입니다." }).trim(),
  userPassword: z
    .string()
    .min(1, { message: "비밀번호를 입력해주세요." })
    .regex(/^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/, { message: "비밀번호를 8자 이상 입력해주세요." })
    .trim(),
});
