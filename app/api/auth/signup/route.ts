import { instance } from "@/lib/axios";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, nickname, password, passwordConfirmation } = body;

    if (!email || !nickname || !password || !passwordConfirmation) {
      return new NextResponse("입력한 내용을 다시 한번 확인해주세요.", { status: 400 });
    }

    const response = await instance.post("/auth/signUp", {
      email,
      nickname,
      password,
      passwordConfirmation
    });

    if (response.status === 200) {
      return NextResponse.json({ status: 200 });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("signup POST 요청에서 api 오류 발생", error);
      return new NextResponse(error.response?.data.message, { status: error.response?.status });
    } else {
      console.error("signup POST 요청에서 알 수 없는 오류 발생", error);
      return new NextResponse("오류가 발생하여 회원가입되지 않았습니다. 잠시 후 다시 시도해주세요.", { status: 500 });
    }
  }
}