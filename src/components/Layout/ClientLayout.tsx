// components/Layout/ClientLayout.tsx
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Provider, useSetAtom } from "jotai";
import { userAtom } from "@/store/authAtoms";
import { loadingAtom } from "@/store/loadingAtom";
import { refreshAccessToken } from "@/api/auth";
import { AuthResponse } from "@/types/auth";
import { getCookie, setCookie, removeAllAuthCookies } from "@/utils/cookie";

export const THIRTY_MINUTES_IN_DAYS = 1 / 48; // 30분을 일 단위로 표현

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const setIsLoading = useSetAtom(loadingAtom);
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    const autoLogin = async () => {
      const refreshToken = getCookie("refreshToken");
      if (refreshToken) {
        try {
          const result: AuthResponse | null = await refreshAccessToken(
            refreshToken
          );

          // result와 필요한 속성들이 유효한지 체크
          if (result && result.accessToken && result.user) {
            setCookie(
              "accessToken",
              result.accessToken,
              THIRTY_MINUTES_IN_DAYS
            );
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
          // 모든 인증 관련 쿠키 제거
          removeAllAuthCookies();
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
    <div className={"Pretendard bg-gray-50 text-gray-900"}>{children}</div>
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
