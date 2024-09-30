import { instance } from "@/lib/axios";
import { IItemList } from "@/types/itemsTypeShare";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const pageSize = url.searchParams.get("pageSize");
    const orderBy = url.searchParams.get("orderBy");

    if (!pageSize) {
      return new NextResponse("제품을 불러오는데 필요한 값을 확인해주세요.", { status: 400 });
    }

    const response = await instance.get(`/products?pageSize=${pageSize}&orderBy=${orderBy}`);

    if (response.status === 200) {
      const bestItems: IItemList[] = response.data.list;
      return NextResponse.json(bestItems, { status: 200 });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("bestItems GET 요청에서 api 오류 발생", error);
      return new NextResponse(error.response?.data.message, { status: error.response?.status });
    } else {
      console.error("bestItems GET 요청에서 알 수 없는 오류 발생", error);
      return new NextResponse("오류가 발생하여 제품을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.", { status: 500 });
    }
  }
}