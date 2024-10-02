// pages/auth/signup/index.tsx
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import InputItem from "@/components/UI/InputItem";
import SocialLogin from "@/components/UI/SocialLogin";
import PasswordInput from "@/components/UI/PasswordInput";
import { signup } from "@/api/auth";
import { SignupFormValues } from "@/types/auth";
import Logo from "@/images/logo/logo-auth.svg";
import Cookies from "js-cookie";

export default function SignupPage() {
  const router = useRouter();

  // useEffect로 페이지가 로드될 때 이미 로그인된 사용자가 있으면 홈으로 리다이렉트
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      router.push("/"); // 액세스 토큰이 있는 경우 홈으로 이동
    }
  }, [router]);

  // react-hook-form으로 폼 관리
  const {
    register, // 폼 필드를 등록하는 함수
    handleSubmit, // 폼 제출을 처리하는 함수
    watch, // 특정 필드의 값 변화를 감지하는 함수
    formState: { errors, isValid }, // 폼 상태(유효성 검사 결과 등)를 추적
  } = useForm<SignupFormValues>({ mode: "onBlur" });

  // 비밀번호와 비밀번호 확인 필드를 실시간으로 감지
  const password = watch("password");

  // 폼 제출 시 호출되는 함수, 서버에 회원가입 요청을 보냄
  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    // 제출된 데이터의 공백을 제거한 후 처리
    const trimmedData: SignupFormValues = {
      email: data.email.trim(),
      nickname: data.nickname?.trim(),
      password: data.password.trim(),
      passwordConfirmation: data.passwordConfirmation.trim(),
    };

    try {
      // 회원가입 요청
      await signup(trimmedData);
      router.push("/auth/login"); // 성공 시 로그인 페이지로 리다이렉트
    } catch (error) {
      console.error("Error:", error);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="mt-70px px-4 py-6 max-w-sm mx-auto md:max-w-2xl md:py-12 lg:py-15">
      {/* 홈으로 돌아가는 로고 */}
      <Link
        href="/"
        className="block mb-6 text-center md:mb-10"
        aria-label="홈으로 이동"
      >
        <Logo className="mx-auto" />
      </Link>

      {/* 회원가입 폼 */}
      <form
        className="mt-10 flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)} // 폼 제출 시 handleSubmit으로 onSubmit 호출
      >
        {/* 이메일 입력 필드 */}
        <InputItem
          id="email" // 필드 이름
          label="이메일" // 레이블 텍스트
          placeholder="이메일을 입력해 주세요" // 입력 필드에 표시될 placeholder
          register={register("email", {
            required: "이메일을 입력해 주세요", // 필수 입력 필드
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
              message: "잘못된 이메일 형식입니다", // 이메일 유효성 검사
            },
          })}
          errorMessage={errors.email?.message} // 유효성 검사 오류 메시지 출력
        />

        {/* 닉네임 입력 필드 */}
        <InputItem
          id="nickname" // 필드 이름
          label="닉네임" // 레이블 텍스트
          placeholder="닉네임을 입력해 주세요" // 입력 필드에 표시될 placeholder
          register={register("nickname", {
            required: "닉네임을 입력해 주세요", // 필수 입력 필드
          })}
          errorMessage={errors.nickname?.message} // 유효성 검사 오류 메시지 출력
        />

        {/* 비밀번호 입력 필드 */}
        <PasswordInput
          id="password" // 필드 이름
          label="비밀번호" // 레이블 텍스트
          placeholder="비밀번호를 입력해 주세요" // 입력 필드에 표시될 placeholder
          register={register("password", {
            required: "비밀번호를 입력해 주세요", // 필수 입력 필드
            minLength: {
              value: 8,
              message: "비밀번호를 8자 이상 입력해 주세요", // 비밀번호 최소 길이 유효성 검사
            },
            pattern: {
              value: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
              message: "영문, 숫자, 특수문자(!@#$%^&*)만 사용 가능합니다", // 비밀번호 패턴 검사
            },
          })}
          errorMessage={errors.password?.message} // 유효성 검사 오류 메시지 출력
        />

        {/* 비밀번호 확인 입력 필드 */}
        <PasswordInput
          id="passwordConfirmation" // 필드 이름
          label="비밀번호 확인" // 레이블 텍스트
          placeholder="비밀번호를 다시 한 번 입력해 주세요" // 입력 필드에 표시될 placeholder
          register={register("passwordConfirmation", {
            required: "비밀번호를 다시 한 번 입력해 주세요", // 필수 입력 필드
            validate: (value) =>
              value === password || "비밀번호가 일치하지 않습니다", // 비밀번호와 일치하는지 검사
          })}
          errorMessage={errors.passwordConfirmation?.message} // 유효성 검사 오류 메시지 출력
        />

        {/* 제출 버튼 */}
        <button
          type="submit" // 폼 제출 버튼
          disabled={!isValid} // 폼이 유효하지 않으면 버튼 비활성화
          className="bg-blue-500 text-white py-3.5 px-8 rounded-full text-base font-bold w-full hover:bg-blue-600 focus:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          회원가입
        </button>
      </form>

      {/* 소셜 로그인 옵션 */}
      <SocialLogin />

      {/* 로그인 링크 */}
      <div className="font-medium text-sm text-center mt-6">
        이미 회원이신가요?{" "}
        <Link
          href="/auth/login"
          className="text-blue-500 underline underline-offset-2"
        >
          로그인
        </Link>
      </div>
    </div>
  );
}
