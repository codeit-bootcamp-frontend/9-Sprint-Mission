"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signinSchema } from "./zodSchema/signinSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
import useToken from "@/hooks/useToken";

const SigninPage = () => {
  const router = useRouter();
  const { setTokens } = useToken();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    mode: "onChange",
    defaultValues: {
      userEmail: "",
      userPassword: "",
    },
  });
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleVisiblePassword = () => {
    setVisiblePassword((prev) => !prev);
  };

  const onSubmit = async (data: z.infer<typeof signinSchema>) => {
    try {
      const response = await axios.post("/api/auth/signin", {
        email: data.userEmail,
        password: data.userPassword,
      });

      if (response.status === 200) {
        setTokens(response.data.accessToken, response.data.refreshToken);
        toast.success("로그인이 완료되었습니다.");
        reset();
        router.push("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data || "로그인에 실패하였습니다.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-10 w-full">
      <div className="flex flex-col space-y-3">
        <label htmlFor="userEmail" className="text-sm font-bold md:text-lg">
          이메일
        </label>
        <input
          {...register("userEmail")}
          type="email"
          id="userEmail"
          name="userEmail"
          placeholder="이메일을 입력해주세요."
          className="px-6 py-4 bg-panda-gray100 rounded-xl focus:outline-none form-ring transition-all"
        />
        {errors.userEmail && <span className="error-text-start">{errors.userEmail.message}</span>}
      </div>
      <div className="flex flex-col space-y-3">
        <label htmlFor="userPassword" className="text-sm font-bold md:text-lg">
          비밀번호
        </label>
        <div className="flex items-center justify-between px-6 py-4 bg-panda-gray100 rounded-xl form-ring transition-all">
          <input
            {...register("userPassword")}
            type={visiblePassword ? "text" : "password"}
            id="userPassword"
            name="userPassword"
            placeholder="비밀번호를 입력해주세요."
            className="bg-panda-gray100 w-full focus:outline-none"
          />
          <Image
            src={visiblePassword ? "/icons/btn_visibility_off.svg" : "/icons/btn_visibility_on.svg"}
            alt="보이기 버튼"
            width={24}
            height={24}
            onClick={handleVisiblePassword}
            className="cursor-pointer"
          />
        </div>
        {errors.userPassword && (
          <span className="error-text-start">{errors.userPassword.message}</span>
        )}
      </div>
      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="px-32 py-4 bg-panda-theme hover:bg-panda-theme-hover disabled:bg-panda-gray400 rounded-full text-white text-lg font-semibold transition-colors w-full"
      >
        {!isSubmitting ? "로그인" : "잠시만 기다려주세요."}
      </button>
    </form>
  );
};

export default SigninPage;
