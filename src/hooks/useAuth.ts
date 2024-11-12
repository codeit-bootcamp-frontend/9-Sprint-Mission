import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { LoginFormValues, SignupFormValues, User } from "@/types/auth";
import axios from "axios";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // 인증 상태 확인 쿼리
  const { data: user, refetch: refetchUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        await axios.post("/api/auth/refreshToken", { withCredentials: true });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("인증 상태 확인 중 오류 발생:", error.response?.data || error.message);
        } else {
          console.error("인증 상태 확인 중 오류 발생:", error);
        }
        return null;
      }
    },
    enabled: router.isReady,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  // 회원가입 mutation
  const signUpMutation = useMutation<{ success: boolean; message: string; user: User | null }, Error, SignupFormValues>(
    {
      mutationFn: async (formData: SignupFormValues) => {
        const response = await axios.post("/api/auth/signUp", {
          email: formData.email,
          password: formData.password,
          passwordConfirmation: formData.passwordConfirmation,
          nickname: formData.nickname,
        });
        return response.data;
      },
      onSuccess: (data) => {
        if (data.success) {
          queryClient.setQueryData(["user"], data.user);
          router.push("/login");
        }
      },
    }
  );

  // 로그인 mutation
  const signInMutation = useMutation<{ success: boolean; message: string; user: User | null }, Error, LoginFormValues>({
    mutationFn: async (formData: LoginFormValues) => {
      const response = await axios.post("/api/auth/signIn", {
        email: formData.email,
        password: formData.password,
      });
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
