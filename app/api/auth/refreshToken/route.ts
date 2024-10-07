import { instance } from "@/lib/axios";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { accessToken } = body;
    
    if (!accessToken) {
      return new NextResponse("세션 만료", { status: 400 });
    }

    const response = await instance.post("/auth/refresh-token", {
      refreshToken: accessToken
    });

    if (response.status === 200) {
      return NextResponse.json(response.data, { status: 200 });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("토큰 갱신 api에서 오류 발생", error);
      return new NextResponse(error.response?.data.message, { status: 500 });
    }
  }
}