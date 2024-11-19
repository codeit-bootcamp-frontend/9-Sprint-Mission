import { instance } from "@/lib/axios";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new NextResponse("이메일 또는 비밀번호가 입력되지 않았습니다.", { status: 400 });
  }
  
  try {
    const response = await instance.post("/auth/signin", {
      email,
      password
    });

    if (response.status === 200) {
      const { accessToken, refreshToken } = response.data;

      return NextResponse.json({ accessToken, refreshToken }, { status: 200 });
    } else {
      return new NextResponse("로그인에 실패하였습니다.", { status: response.status });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("로그인 실패", error.response?.data);
      return new NextResponse("로그인에 실패하였습니다.", { status: error.response?.status });
    } else {
      console.error("서버 오류", error);
      return new NextResponse("서버 오류 발생", { status: 500 });
    }
  }
};
