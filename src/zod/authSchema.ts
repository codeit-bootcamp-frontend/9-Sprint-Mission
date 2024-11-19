import { z } from "zod";
import { emailSchema, passwordSchema } from "./commonSchema";

// 로그인 스키마
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// 회원가입 스키마
export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });
