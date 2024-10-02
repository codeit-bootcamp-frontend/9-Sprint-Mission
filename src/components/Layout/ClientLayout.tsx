// components/Layout/ClientLayout.tsx
import React, { useEffect } from "react";
import localFont from "next/font/local";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Provider, useSetAtom } from "jotai";
import { userAtom } from "@/store/authAtoms";
import { loadingAtom } from "@/store/loadingAtom";
import { refreshAccessToken } from "@/api/auth";
import { AuthResponse } from "@/types/auth";

const pretendard = localFont({
  src: "../../fonts/pretendard/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const setIsLoading = useSetAtom(loadingAtom);
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    const autoLogin = async () => {
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        try {
          const result: AuthResponse | null = await refreshAccessToken(
            refreshToken
          );

          // result와 필요한 속성들이 유효한지 체크
          if (result && result.accessToken && result.user) {
            Cookies.set("accessToken", result.accessToken);
            setUser({
              Id: result.user.id?.toString() || null,
              nickname: result.user.nickname || null,
              Image: result.user.image || null,
            });
          } else {
            throw new Error("refreshAccessToken에서 유효하지 않은 Response");
          }
        } catch (error) {
          console.error("자동 로그인 실패:", error);
          // 리프레시 토큰이 만료되었거나 유효하지 않을 경우 처리
          Cookies.remove("refreshToken");
          // accessToken도 삭제
          Cookies.remove("accessToken");
        }
      }
    };

    autoLogin();
  }, [setUser]);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };
    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };
    const handleRouteChangeError = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router.events, setIsLoading]);

  return (
    <div className={pretendard.className + " bg-gray-50 text-gray-900"}>
      {children}
    </div>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </Provider>
  );
}
