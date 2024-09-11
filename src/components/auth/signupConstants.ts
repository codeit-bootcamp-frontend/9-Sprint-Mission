import * as z from "zod";

export const SignupSchema = z
  .object({
    userEmail: z
      .string()
      .min(1, { message: "이메일을 입력해주세요." })
      .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i, {
        message: "잘못된 이메일입니다.",
      })
      .trim(),
    userNickname: z
      .string()
      .min(1, { message: "닉네임을 입력해주세요." })
      .regex(/([A-Za-zㄱ-ㅎ가-힣0-9])/, { message: "닉네임에 특수문자는 사용할 수 없습니다." })
      .trim(),
    userPassword: z
      .string()
      .min(1, { message: "비밀번호를 입력해주세요." })
      .regex(
        /^(?=.{8,}).*$/,
        { message: "비밀번호를 8자 이상 입력해주세요." }
      )
      .trim(),
    userPassword2: z.string().min(1, { message: "비밀번호를 다시 한 번 입력해주세요." }).trim(),
  })
  .refine((data) => data.userPassword === data.userPassword2, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["userPassword2"],
  });
