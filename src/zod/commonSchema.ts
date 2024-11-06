import { z } from "zod";

// 공통 이메일 스키마
export const emailSchema = z.string().email();

// 공통 닉네임 스키마
export const nicknameSchema = z.string().min(1, "닉네임은 필수입니다.");

// 공통 비밀번호 스키마
export const passwordSchema = z.string().min(6, "비밀번호는 6자 이상이어야 합니다.");
