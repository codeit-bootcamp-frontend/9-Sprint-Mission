import { instance } from "@/lib/axios";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse("입력한 내용을 다시 한번 확인해주세요.", { status: 400 });
    }

    const response = await instance.post("/auth/signIn", {
      email,
      password
    });

    if (response.status === 200) {
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      return NextResponse.json({accessToken, refreshToken}, { status: 200 });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("signin POST 요청에서 api 오류 발생", error);
      return new NextResponse(error.response?.data.message, { status: error.response?.status });
    } 
  }
}