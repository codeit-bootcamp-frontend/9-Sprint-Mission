import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, AuthProviderProps, User } from "@/types/auth";
import { useRouter } from "next/router";
import instance from "@/api/axios";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // 토큰의 만료여부를 확인해주는 함수
  const isTokenValid = (token: string) => {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded.exp * 1000 > Date.now();
    } catch (error) {
      console.error("Invalid token format:", error);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await instance.post(`/auth/signIn`, { email, password });
      const {
        accessToken,
        refreshToken,
        user: { id, email: userEmail },
      } = res.data;

      const userData = { id: id, email: userEmail };
      setUser(userData);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(userData)); // 유저 데이터 저장
      router.push("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
    if (user === null) router.push("/");
  };

  const signUp = async (
    email: string,
    password: string,
    nickname: string,
    passwordConfirmation: string
  ) => {
    try {
      await instance.post("/auth/signUp", {
        email,
        nickname,
        password,
        passwordConfirmation,
      });
      router.push("/signin");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const storedUser = localStorage.getItem("user");

    // refreshToken 없으면 로그아웃
    if (!refreshToken) {
      logout();
      return;
    }

    // 새로고침 하거나 페이지 이동시에 user 상태값이 초기화되는 것ㅇ르 방지
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // 토큰이 유효한 경우 불필요한 갱신을 방지
    if (accessToken && isTokenValid(accessToken)) {
      console.log("유효한 accessToken이 있습니다. 로그인 상태를 유지합니다.");
      return;
    }

    // accessToken이 없거나 만료된 경우 refresh 토큰을 이용해 갱신
    const refreshAccessToken = async () => {
      try {
        const res = await instance.post("/auth/refresh-token", {
          refreshToken,
        });
        const { accessToken: newAccessToken } = res.data;

        setUser((prevData) => ({
          ...prevData,
          accessToken: newAccessToken,
        }));

        localStorage.setItem("accessToken", newAccessToken);
        console.log("토큰 갱신 성공");
      } catch (error) {
        console.error("토큰 갱신 실패:", error);
        logout(); // 갱신 실패 시 로그아웃
      }
    };
    refreshAccessToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth: Context 값을 쉽게 사용하기 위한 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 내에서 사용해야 합니다.");
  }
  return context;
};
