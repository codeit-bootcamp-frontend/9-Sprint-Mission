import { MeResponse } from "@/types/auth";
import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
}

interface UpdateProfileData {
  image: string;
}

export const useUser = () => {
  const queryClient = useQueryClient();

  // 사용자 정보 조회
  const { data: user, isLoading: isLoadingUser } = useQuery<MeResponse>({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get<MeResponse>("/api/users/me");
      return data;
    },
  });

  // 프로필 이미지 수정
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useMutation<
    MeResponse,
    AxiosError,
    UpdateProfileData
  >({
    mutationFn: async (data) => {
      const { data: responseData } = await axios.patch<MeResponse>("/api/users/me", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return responseData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  // 비밀번호 변경
  const { mutate: updatePassword, isPending: isUpdatingPassword } = useMutation<
    MeResponse,
    AxiosError,
    UpdatePasswordData
  >({
    mutationFn: async (data) => {
      const { data: responseData } = await axios.patch<MeResponse>("/api/users/me/password", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return responseData;
    },
  });

  return {
    // 데이터
    user,

    // 로딩 상태
    isLoadingUser,
    isUpdatingProfile,
    isUpdatingPassword,

    // 뮤테이션 함수
    updateProfile,
    updatePassword,
  };
};
