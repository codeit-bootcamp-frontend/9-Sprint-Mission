import { instance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const useImageUpload = () => {
  const imageUploadMutation = useMutation({
    mutationKey: ["imageUpload"],
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("image", file);
      return instance.post("/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (response) => {
      return response.data.url;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error("이미지 업로드 실패", error.response?.data);
        toast.error("이미지 업로드에 실패했습니다.");
      } else {
        console.error("네트워크 문제 또는 기타 오류", error);
        toast.error("업로드 중 문제가 발생했습니다.");
      }
    },
  });

  return imageUploadMutation;
};
