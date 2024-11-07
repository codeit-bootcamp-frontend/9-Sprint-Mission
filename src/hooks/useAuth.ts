import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { LoginFormValues, SignupFormValues, AuthResponse, User } from "@/types/auth";
import axios from "axios";
import { removeAllAuthCookies } from "@/utils/cookie";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // 인증 상태 확인 쿼리
  const { data: user, refetch: refetchUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await axios.post<{ user: User | null; isLogin: boolean }>("/api/auth/refreshToken");
        return response.data.user;
      } catch (error) {
        console.error("인증 상태 확인 중 오류 발생:", error);
        return null;
      }
    },
  });

  // 회원가입 mutation
  const signUpMutation = useMutation<AuthResponse, Error, SignupFormValues>({
    mutationFn: async (formData) => {
      const response = await axios.post<AuthResponse>("/api/auth/signUp", formData);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.setQueryData(["user"], data.user);
        router.push("/auth/login");
      }
    },
  });

  // 로그인 mutation
  const signInMutation = useMutation<AuthResponse, Error, LoginFormValues>({
    mutationFn: async (formData) => {
      const response = await axios.post<AuthResponse>("/api/auth/signIn", formData);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.setQueryData(["user"], data.user);
        router.push("/");
      }
    },
  });

  // 로그아웃 mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await removeAllAuthCookies();
      const response = await axios.post("/api/auth/logout");
      return response.data;
    },
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      router.push("/");
    },
  });

  return {
    user,
    refetchUser,
    signUp: signUpMutation.mutateAsync,
    signIn: signInMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoading: signUpMutation.isPending || signInMutation.isPending || logoutMutation.isPending,
    error: signUpMutation.error || signInMutation.error || logoutMutation.error,
  };
};
