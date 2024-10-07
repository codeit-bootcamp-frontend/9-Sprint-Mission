// pages/auth/login/index.tsx
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import InputItem from "@/components/UI/InputItem";
import SocialLogin from "@/components/UI/SocialLogin";
import PasswordInput from "@/components/UI/PasswordInput";
import { logIn } from "@/api/auth";
import { LoginFormValues, AuthResponse } from "@/types/auth";
import { useSetAtom } from "jotai";
import { userAtom } from "@/store/authAtoms";
import {
  getCookie,
  setCookie,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} from "@/utils/cookie";
// public 폴더 경로 문자열로 대체
const LOGO_AUTH = "/images/logo/logo-auth.png";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useSetAtom(userAtom); // 사용자 상태를 업데이트하기 위한 jotai atom

  // useEffect로 페이지가 로드될 때 이미 로그인된 사용자가 있으면 홈으로 리다이렉트
  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = getCookie("accessToken");
      if (accessToken) {
        router.push("/"); // 액세스 토큰이 있는 경우 홈으로 이동
      }
    }
  }, [router]);

  // react-hook-form 사용하여 폼 상태 및 유효성 검사 관리
  const {
    register, // 폼 필드를 등록하는 함수
    handleSubmit, // 폼 제출을 처리하는 함수
    formState: { errors, isValid }, // 폼 상태(유효성 검사 결과 등)를 추적
  } = useForm<LoginFormValues>({ mode: "onChange" });

  // 폼 제출 시 호출되는 함수, 서버에 로그인 요청을 보냄
  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    // 제출된 데이터의 공백을 제거한 후 처리
    const trimmedData: LoginFormValues = {
      email: data.email.trim(),
      password: data.password.trim(),
    };

    try {
      // 로그인 요청 및 응답 처리
      const userData = (await logIn(trimmedData)) as AuthResponse;
      const userId = userData.user.id.toString();
      const userImage = userData.user.image ? userData.user.image : "";
      const userNickname = userData.user.nickname;

      // 쿠키에 인증 토큰과 사용자 정보 저장
      setCookie("accessToken", userData.accessToken, ACCESS_TOKEN_EXPIRY);
      setCookie("refreshToken", userData.refreshToken, REFRESH_TOKEN_EXPIRY);
      setCookie("userId", userId, ACCESS_TOKEN_EXPIRY);
      setCookie("userImage", userImage, ACCESS_TOKEN_EXPIRY);
      setCookie("nickname", userNickname, ACCESS_TOKEN_EXPIRY);

      // jotai userAtom을 사용하여 상태 업데이트
      setUser({
        Id: userId,
        Image: userImage,
        nickname: userNickname,
      });

      // 로그인 후 홈으로 리다이렉트
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
      alert("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="mt-70px px-4 py-6 max-w-sm mx-auto md:max-w-2xl md:py-12 lg:py-15">
      {/* 홈으로 돌아가는 로고 */}
      <Link href="/" className="md:mb-10" aria-label="홈으로 이동">
        <Image
          src={LOGO_AUTH}
          width={396}
          height={132}
          alt="로고"
          className="mx-auto"
        />
      </Link>

      {/* 로그인 폼 */}
      <form
        className="mt-10 flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)} // 폼 제출 시 handleSubmit으로 onSubmit 호출
      >
        {/* 이메일 입력 필드 */}
        <InputItem
          id="email" // LoginFormValues의 email 필드와 연동
          label="이메일" // 레이블 텍스트
          placeholder="이메일을 입력해 주세요" // 입력 필드에 표시될 placeholder
          register={register("email", {
            required: "이메일을 입력해 주세요", // 필수 필드
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
              message: "잘못된 이메일 형식입니다", // 이메일 유효성 검사
            },
          })}
          errorMessage={errors.email?.message} // 유효성 검사 오류 메시지 출력
        />

        {/* 비밀번호 입력 필드 */}
        <PasswordInput
          id="password" // LoginFormValues의 password 필드와 연동
          label="비밀번호" // 레이블 텍스트
          placeholder="비밀번호를 입력해 주세요" // 입력 필드에 표시될 placeholder
          register={register("password", {
            required: "비밀번호를 입력해 주세요", // 필수 필드
            minLength: {
              value: 8,
              message: "비밀번호를 8자 이상 입력해 주세요", // 최소 길이 검사
            },
          })}
          errorMessage={errors.password?.message} // 유효성 검사 오류 메시지 출력
        />

        {/* 제출 버튼 */}
        <button
          type="submit" // 폼 제출 버튼
          disabled={!isValid} // 폼 유효성 검사가 통과하지 않으면 버튼 비활성화
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
        <Link
          href="/auth/signup"
          className="text-blue-500 underline underline-offset-2"
        >
          회원가입
        </Link>
      </div>
    </div>
  );
}
