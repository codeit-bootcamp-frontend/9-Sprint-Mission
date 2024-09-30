"use client"

import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface IToken {
  session: boolean;
  accessToken: string | null;
  Signin: () => void;
  Signout: () => void;
}

// 토큰 불러오는 컨텍스트
export const TokenContext = createContext<IToken | undefined>(undefined);

export const TokenProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);

    if (token !== null) {
      setSession(true);
    } 
  }, []);

  const Signin = () => {
    setSession(true);
  };

  const Signout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    setSession(false);
  }

  return (
    <TokenContext.Provider value={{ session, accessToken, Signin, Signout }}>
      {children}
    </TokenContext.Provider>
  );
}