// components/Layout/ClientLayout.tsx
import React, { useEffect } from "react";
import { Provider, useAtom } from "jotai";
import { userAtom } from "@/store/authAtoms";
import { refreshAccessToken } from "@/api/auth";
import { AuthResponse, User } from "@/types/auth";
import {
  getCookie,
  setCookie,
  removeAllAuthCookies,
  ACCESS_TOKEN_EXPIRY,
} from "@/utils/cookie";
import Header from "./Header";

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const autoLogin = async () => {
      const refreshToken = getCookie("refreshToken");
      if (refreshToken) {
        try {
          const result: AuthResponse | null = await refreshAccessToken(
            refreshToken
          );

          if (result && result.accessToken && result.user) {
            setCookie("accessToken", result.accessToken, ACCESS_TOKEN_EXPIRY);
            setUser({
              id: result.user.id?.toString() || null,
              nickname: result.user.nickname || null,
              image: result.user.image || null,
            });
          } else {
            throw new Error("refreshAccessToken에서 유효하지 않은 Response");
          }
        } catch (error) {
          console.error("자동 로그인 실패:", error);
          removeAllAuthCookies();
        }
      }
    };

    autoLogin();
  }, [setUser]);

  return (
    <div className={"Pretendard bg-gray-50 text-gray-900"}>
      <Header user={user as User | null} />
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
