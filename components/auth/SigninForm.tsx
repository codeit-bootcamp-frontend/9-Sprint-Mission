import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ISigninForm } from "@/app/(auth)/authTypeShare";
import { z } from "zod";
import axios from "axios";
import { SigninSchema } from "@/app/(auth)/signin/signinConstants";
import useToken from "@/hooks/useToken";

const AuthForm = ({ form, isLoading, error }: ISigninForm) => {
  const router = useRouter();
  const context = useToken();

  const [apiError, setApiError] = useState("");
  const [serverError, setServerError] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleVisiblePassword = () => {
    setVisiblePassword((prev) => !prev);
  };

  const handleSubmit = async (values: z.infer<typeof SigninSchema>) => {
      try {
        const response = await axios.post("/api/auth/signin", {
          email: values.userEmail,
          password: values.userPassword,
        });
  
        if (response.status === 200) {
          localStorage.setItem("accessToken", response.data);
          context?.Signin();
          router.push("/");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("로그인 POST 요청에서 API 오류 발생", error);
          setApiError(error.response?.data);
        } else {
          console.error("로그인 POST 요청에서 알 수 없는 오류 발생", error);
          setServerError(true);
        }
      }
    
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col space-y-10 w-full">
      <div className="flex flex-col space-y-3">
        <label htmlFor="userEmail" className="text-sm font-bold md:text-lg">
          이메일
        </label>
        <input
          {...form.register("userEmail")}
          type="email"
          id="userEmail"
          name="userEmail"
          placeholder="이메일을 입력해주세요."
          className="px-6 py-4 bg-[--color-gray100] rounded-xl focus:outline-none form-ring transition-all"
        />
        {error && <span className="error-text-start">{error.userEmail?.message}</span>}
      </div>
      <div className="flex flex-col space-y-3">
        <label htmlFor="userPassword" className="text-sm font-bold md:text-lg">
          비밀번호
        </label>
        <div className="flex items-center justify-between px-6 py-4 bg-[--color-gray100] rounded-xl form-ring transition-all">
          <input
            {...form.register("userPassword")}
            type={visiblePassword ? "text" : "password"}
            id="userPassword"
            name="userPassword"
            placeholder="비밀번호를 입력해주세요."
            className="bg-[--color-gray100] w-full focus:outline-none"
          />
          <Image
            src={visiblePassword ? "/icons/btn_visibility_off.svg" : "/icons/btn_visibility_on.svg"}
            alt="보이기 버튼"
            width={24}
            height={24}
            onClick={handleVisiblePassword}
          />
        </div>
        {error && <span className="error-text-start">{error.userPassword?.message}</span>}
      </div>
      {serverError && (
        <span className="error-text-center">
          회원가입 중 오류가 발생하여 가입되지 않았습니다. <br /> 잠시 후 다시 시도해주세요.
        </span>
      )}
      {apiError !== "" && <span className="error-text-center">{apiError}</span>}
      <button
        type="submit"
        disabled={!form.formState.isValid}
        className="px-32 py-4 bg-[--color-theme] hover:bg-[--color-theme-hover] disabled:bg-[--color-gray400] rounded-full text-white text-lg font-semibold transition-all w-full"
      >
        {!isLoading ? "로그인" : "잠시만 기다려주세요."}
      </button>
    </form>
  );
};

export default AuthForm;
