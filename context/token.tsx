"use client"

import { createContext, PropsWithChildren, useState } from "react";

interface IToken {
  session: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  Signin: () => void;
  Signout: () => void;
}

// 토큰 불러오는 컨텍스트
export const TokenContext = createContext<IToken | undefined>(undefined);

export const TokenProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

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
  }

  return (
    <TokenContext.Provider value={{ session, accessToken, refreshToken, Signin, Signout }}>
      {children}
    </TokenContext.Provider>
  );
}