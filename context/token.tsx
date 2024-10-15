"use client";

import { getRefreshToken } from "@/lib/utils";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

export interface IToken {
  session: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  Signin: () => void;
  Signout: () => void;
  checkTokenExpire: () => void;
}

// 토큰 불러오는 컨텍스트
export const TokenContext = createContext<IToken | undefined>(undefined);

export const TokenProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const handleTokenRefresh = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      try {
        await getRefreshToken(refreshToken);
      } catch (error) {
        console.error("리프레쉬 토큰 가져오기 실패", error);
      }
    }
  }

  // 토큰 만료시간 5분 전 리프레쉬
  const checkTokenExpire = () => {
    const token = localStorage.getItem("accessToken");
    let expireAt;

    if (typeof token === "string") {
      const payload = JSON.parse(atob(token?.split(".")[1]));
      expireAt = payload.exp ? payload.exp * 1000 : null;
    }

    if (expireAt) {
      const currentTime = Date.now();
      const refreshTime = expireAt - currentTime - 300000;
      
      if (refreshTime > 0) {
        setTimeout(async () => {
          if (typeof refreshToken === "string") {
            await handleTokenRefresh();
          }
        }, refreshTime);
      } else {
        handleTokenRefresh();
      }
    }
  };

  // 로그인 유지함수
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token !== null) {
      setSession(true);
    }
  }, []);

  const Signin = () => {
    setSession(true);

    const token = localStorage.getItem("accessToken");
    const refresh = localStorage.getItem("refreshToken");

    if (token && refresh) {
      setAccessToken(token);
      setRefreshToken(refresh);
      setSession(true);
    }
  };

  const Signout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAccessToken(null);
    setRefreshToken(null);
    setSession(false);
  };

  return (
    <TokenContext.Provider value={{ session, accessToken, refreshToken, Signin, Signout, checkTokenExpire }}>
      {children}
    </TokenContext.Provider>
  );
};
