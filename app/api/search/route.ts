import { instance } from "@/lib/axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const body = req.url.split("keyword=");
    const keyword = body[1];

    if (!keyword) {
      return new NextResponse("검색할 키워드를 찾을 수 없습니다.", { status: 400 });
    }

    const response = await instance.get(`/articles?keyword=${keyword}`);

    if (response.status === 200) {
      const searchList = response.data.list;
      return NextResponse.json(searchList, { status: 200 });
    }
  } catch (error) {
    console.error("검색 api에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 검색결과를 찾을 수 없습니다.", { status: 500 });
  }
}