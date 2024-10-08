// pages/api/auth/signUp.ts
import { NextApiRequest, NextApiResponse } from "next";
import axiosInstance from "@/api/axiosConfig";
import { SignupFormValues, User } from "@/types/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      email,
      nickname,
      password,
      passwordConfirmation,
    }: SignupFormValues = req.body;

    try {
      // 백엔드 API에 회원가입 요청
      const user = (
        await axiosInstance.post("/auth/signUp", {
          email,
          nickname,
          password,
          passwordConfirmation,
        })
      ).data as User;

      // 회원가입 성공 시 사용자 정보 반환
      return res.status(200).json({ message: "회원가입 성공", user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "회원가입 요청에 실패했습니다." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }
}
