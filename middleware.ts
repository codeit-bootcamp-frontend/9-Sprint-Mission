import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const path = new URL(request.url).pathname;

  if (path.startsWith("/additem") || path.startsWith("/addboard")) {
    const accessToken = request.cookies.get("accessToken");

    if (!accessToken) {
      return NextResponse.redirect("http://localhost:3000/signin");
    }
  }

  return NextResponse.next();
}
