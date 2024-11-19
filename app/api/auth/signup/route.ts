import { instance } from "@/lib/axios";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const { email, nickname, password, passwordConfirmation } = body;

    if (!email || !nickname || !password || !passwordConfirmation) {
      return new NextResponse("입력하신 내용을 다시 확인해주세요.", { status: 400 });
    }

    const response = await instance.post("/auth/signUp", {
      email,
      nickname,
      password,
      passwordConfirmation,
    });

    if (response.status === 201) {
      return NextResponse.json({ status: 200 });
    } else {
      return new NextResponse("서버 오류 발생", { status: response.status });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("회원가입 실패", error.response?.data);
      return new NextResponse(error.response?.data.message, { status: error.response?.status });
    } else {
      console.error("서버 오류", error);
      return new NextResponse("서버 오류 발생", { status: 500 });
    }
  }
};
