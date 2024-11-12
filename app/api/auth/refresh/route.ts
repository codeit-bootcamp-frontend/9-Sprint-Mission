import { instance } from "@/lib/axios";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { refreshToken } = await req.json();

  if (!refreshToken) {
    return new NextResponse("토큰 확인 필요", { status: 400 });
  }

  try {
    const response = await instance.post("/auth/refresh-token", { refreshToken });

    if (response.status === 200) {
      return NextResponse.json(response.data, { status: 200 });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return new NextResponse("토큰 갱신 실패", { status: error.response?.status });
    }
  }
};
