import { createContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  isAuth: boolean;
  Login: () => void;
  Logout: () => void;
}

// Context 생성
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// AuthProvider 컴포넌트 정의
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);

  // 로컬 스토리지에서 토큰을 읽어와 로그인 상태 초기화
  useEffect(() => {
    // localStorage는 브라우저 환경에서만 사용 가능하고
    // 클라이언트 측에서만 접근 가능
    const token = localStorage.getItem("ACCESS_TOKEN");
    const refresh = localStorage.getItem("REFRESH_TOKEN");
    if (token && refresh) {
      setIsAuth(true);
    }
  }, []);

  const Login = () => setIsAuth(true);
  const Logout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};
