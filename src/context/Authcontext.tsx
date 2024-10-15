import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import instance from "@/api/axios";

interface User {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signUp: (
    email: string,
    password: string,
    nickname: string,
    passwordConfirmation: string
  ) => Promise<void>;
}

// AuthProvider 컴포넌트 정의
interface AuthProviderProps {
  children: ReactNode; // ReactNode로 children 타입 지정
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const res = await instance.post(`/auth/signIn`, { email, password });
      const {
        accessToken,
        refreshToken,
        email: userEmail,
        password: usePassword,
      } = res.data;
      setUser({ email: userEmail, password: usePassword });

      // 로컬 스토리지에 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      router.push("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    router.push("/");
  };

  const signUp = async (
    email: string,
    password: string,
    nickname: string,
    passwordConfirmation: string
  ) => {
    try {
      const response = await instance.post("/auth/signUp", {
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
    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      logout(); // refreshToken 없으면 로그아웃
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await instance.post("/auth/refresh-token", {
          refreshToken,
        });
        const {
          accessToken,
          email: userEmail,
          password: userPassword,
        } = res.data;

        setUser({ email: userEmail, password: userPassword }); // 유저 정보 설정
        localStorage.setItem("accessToken", accessToken); // 새로운 토큰 저장
        console.log("토큰 갱신 성공");
      } catch (error) {
        console.error("토큰 갱신 실패:", error);
        logout(); // 갱신 실패 시 로그아웃
      }
    };

    if (!user && token) {
      fetchUserData(); // 새로고침 시 유저 정보를 가져옵니다.
    }
  }, [user]);

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
