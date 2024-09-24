// components/Layout/ClientLayout.tsx
import React, { useEffect } from "react";
import localFont from "next/font/local";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { Provider, useAtomValue, useSetAtom } from "jotai";
import { userIdAtom, nicknameAtom, userImageAtom } from "@/store/auth";
import { loadingAtom } from "@/store/loadingAtom";
import { refreshAccessToken } from "@/api/authApi";
import { AuthResponse } from "@/types/auth";

const pretendard = localFont({
  src: "../../fonts/pretendard/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isLoading = useAtomValue(loadingAtom);
  const setIsLoading = useSetAtom(loadingAtom);
  const setUserId = useSetAtom(userIdAtom);
  const setNickname = useSetAtom(nicknameAtom);
  const setUserImage = useSetAtom(userImageAtom);

  useEffect(() => {
    const autoLogin = async () => {
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        try {
          const result = (await refreshAccessToken(
            refreshToken
          )) as AuthResponse;
          if (result.accessToken) {
            Cookies.set("accessToken", result.accessToken);
            setUserId(result.user.id.toString());
            setNickname(result.user.nickname);
            setUserImage(result.user.image);
            // 필요한 경우 다른 사용자 정보도 설정
          }
        } catch (error) {
          console.error("자동 로그인 실패:", error);
          // 리프레시 토큰이 만료되었거나 유효하지 않은 경우 처리
          Cookies.remove("refreshToken");
        }
      }
    };

    autoLogin();
  }, [setUserId, setNickname, setUserImage]);

  useEffect(() => {
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [router.pathname, router.query, setIsLoading]);

  return (
    <div className={pretendard.className + " bg-gray-50 text-gray-900"}>
      {isLoading && <LoadingSpinner isLoading={isLoading} />}
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
