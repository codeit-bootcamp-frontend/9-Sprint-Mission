// pages/login/index.tsx
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputItem from "@/components/UI/InputItem";
import SocialLogin from "@/components/UI/SocialLogin";
import PasswordInput from "@/components/UI/PasswordInput";
import { LoginFormValues } from "@/types/auth";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import AlertModal from "@/components/UI/modal/AlertModal";
import { useAuth } from "@/hooks/useAuth";

// public 폴더 경로 문자열로 대체
const LOGO_AUTH = "/images/logo/logo-auth.png";

const LoginPage = () => {
  const router = useRouter();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { signIn, isLoading: isAuthLoading, user } = useAuth();

  useEffect(() => {
    async function initializeAuthStatus() {
      if (user) {
        router.push("/");
      }
    }

    initializeAuthStatus();
  }, [router, user]);

  // react-hook-form 사용하여 폼 상태 및 유효성 검사 관리
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({ mode: "onBlur" });

  // 폼 제출 시 호출되는 함수
  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const trimmedData: LoginFormValues = {
      email: data.email.trim(),
      password: data.password.trim(),
    };

    try {
      const response = await signIn(trimmedData);
      if (!response.user) {
        setAlertMessage("로그인에 실패했습니다.");
        setIsAlertOpen(true);
      }
      // 성공 시 useAuth 훅의 onSuccess에서 자동으로 홈으로 리다이렉트됨
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
      setIsAlertOpen(true);
    }
  };

  const [isPasswordValid, setIsPasswordValid] = useState({
    length: false,
    pattern: false,
  });

  // 비밀번호를 실시간으로 감지
  const password = watch("password");

  useEffect(() => {
    setIsPasswordValid({
      length: password ? password.length >= 6 : false,
      pattern: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/.test(password || ""),
    });
  }, [password]);

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  if (isAuthLoading) {
    return <LoadingSpinner isLoading={true} />;
  }

  return (
    <div className="mt-70px px-4 py-6 max-w-sm mx-auto md:max-w-2xl md:py-12 lg:py-15">
      {/* 홈으로 돌아가는 로고 */}
      <Link href="/" className="md:mb-10" aria-label="홈으로 이동">
        <Image src={LOGO_AUTH} width={396} height={132} alt="로고" className="mx-auto" priority={true} />
      </Link>

      {/* 로그인 폼 */}
      <form className="mt-10 flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        {/* 이메일 입력 필드 */}
        <InputItem
          id="email"
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          register={register("email", {
            required: "이메일을 입력해 주세요",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
              message: "잘못된 이메일 형식입니다",
            },
          })}
          errorMessage={errors.email?.message}
        />

        {/* 비밀번호 입력 필드 */}
        <PasswordInput
          id="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요"
          register={register("password", {
            required: "비밀번호를 입력해 주세요",
            minLength: {
              value: 6,
              message: "비밀번호를 6자 이상 입력해 주세요",
            },
            pattern: {
              value: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
              message: "영문, 숫자, 특수문자(!@#$%^&*) 사용 가능합니다",
            },
          })}
          errorMessage={errors.password?.message}
        />

        {/* 비밀번호 유효성 메시지 */}
        {password && (
          <div className="text-sm">
            <p className={isPasswordValid.length ? "text-green-500" : "text-red-500"}>
              {isPasswordValid.length ? "✓" : "✗"} 비밀번호는 6자 이상이어야 합니다.
            </p>
          </div>
        )}

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={!isValid}
          className="bg-blue-500 text-white py-3.5 px-8 rounded-full text-base font-bold w-full hover:bg-blue-600 focus:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          로그인
        </button>
      </form>

      {/* 소셜 로그인 옵션 */}
      <SocialLogin />

      {/* 회원가입 링크 */}
      <div className="font-medium text-sm text-center mt-6">
        판다마켓이 처음이신가요?{" "}
        <Link href="/signup" className="text-blue-500 underline underline-offset-2">
          회원가입
        </Link>
      </div>

      {/* AlertModal 컴포넌트 */}
      <AlertModal isOpen={isAlertOpen} message={alertMessage} onClose={handleCloseAlert} />
    </div>
  );
};

export default LoginPage;
