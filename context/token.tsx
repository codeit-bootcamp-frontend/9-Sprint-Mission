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
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken !== null) {
      setSession(true);
    } 
  }, [accessToken]);

  const Signin = () => {
    setSession(true);
  };

  const Signout = () => {
    localStorage.removeItem("accessToken");
    setSession(false);
  }

  return (
    <TokenContext.Provider value={{ session, accessToken, Signin, Signout }}>
      {children}
    </TokenContext.Provider>
  );
}