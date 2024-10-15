import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

// Hook으로 Context 사용하기
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 내에서 사용해야 합니다.");
  }
  return context;
};

export default useAuth;
