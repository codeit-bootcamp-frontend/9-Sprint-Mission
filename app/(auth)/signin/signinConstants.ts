import * as z from "zod";

export const SigninSchema = z.object({
  userEmail: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i, {
      message: "잘못된 이메일입니다.",
    })
    .trim(),
  userPassword: z
    .string()
    .min(1, { message: "비밀번호를 입력해주세요." })
    .regex(/^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/, { message: "비밀번호를 8자 이상 입력해주세요." })
    .trim(),
});