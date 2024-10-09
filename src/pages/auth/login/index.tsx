// pages/auth/login/index.tsx
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputItem from "@/components/UI/InputItem";
import SocialLogin from "@/components/UI/SocialLogin";
import PasswordInput from "@/components/UI/PasswordInput";
import { signIn } from "@/api/auth/signIn";
import { LoginFormValues, User } from "@/types/auth";
import { useAtom } from "jotai";
import { userAtom } from "@/store/authAtoms";
import { ACCESS_TOKEN_EXPIRY, setCookie } from "@/utils/cookie";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import AlertModal from "@/components/UI/modal/AlertModal";
import { checkAuthStatus } from "@/utils/authUtils";

// public 폴더 경로 문자열로 대체
const LOGO_AUTH = "/images/logo/logo-auth.png";

export default function LoginPage() {
  const router = useRouter();
  const [, setUser] = useAtom(userAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    async function initializeAuthStatus() {
      setIsLoading(true);
      const authStatus = await checkAuthStatus();

      if (authStatus.isLogin) {
        router.push("/");
      } else if (authStatus.status && authStatus.status !== 404) {
        // 404가 아닌 모든 에러 상태에 대해 AlertModal 표시
        setAlertMessage(authStatus.message);
        setIsAlertOpen(true);
      }
      setIsLoading(false);
    }

    initializeAuthStatus();
  }, [router]);

  // react-hook-form 사용하여 폼 상태 및 유효성 검사 관리
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({ mode: "onBlur" });

  // 폼 제출 시 호출되는 함수, 서버에 로그인 요청을 보냄
  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsLoading(true);
    // 제출된 데이터의 공백을 제거한 후 처리
    const trimmedData: LoginFormValues = {
      email: data.email.trim(),
      password: data.password.trim(),
    };

    try {
      // 로그인 요청 및 응답 처리
      const response = await signIn(trimmedData);

      if (response.success) {
        const userData = response.user as User;
        const userId = userData.id.toString();
        const userImage = userData.image ? userData.image : "";
        const userNickname = userData.nickname;
        const userEmail = userData.email;
        const userUpdatedAt = userData.updatedAt;
        const userCreatedAt = userData.createdAt;

        // 쿠키에 로그인한 유 정보 저장
        setCookie("userId", userId, ACCESS_TOKEN_EXPIRY);
        setCookie("userImage", userImage || "", ACCESS_TOKEN_EXPIRY);
        setCookie("nickname", userNickname || "", ACCESS_TOKEN_EXPIRY);

        // jotai userAtom을 사용하여 상태 업데이트
        setUser({
          id: Number(userId),
          image: userImage,
          nickname: userNickname,
          email: userEmail,
          updatedAt: userUpdatedAt,
          createdAt: userCreatedAt,
        });

        // 로그인 후 홈으로 리다이렉트
        router.push("/");
      } else {
        setAlertMessage(response.message || "로그인에 실패했습니다.");
        setIsAlertOpen(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
      setIsAlertOpen(true);
    } finally {
      setIsLoading(false);
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
      length: password ? password.length >= 8 : false,
      pattern: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/.test(password || ""),
    });
  }, [password]);

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

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
          priority={true}
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
          placeholder="이메일을 입력해 주세요" // 입력 필드에 표시 placeholder
          register={register("email", {
            required: "이메일을 입력해 주세요", // 필수 필드
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
              message: "잘못된 이메 형식입니다", // 이메일 유효성 검사
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

        {/* 비밀번호 유효성 메시지 */}
        {password && (
          <div className="text-sm">
            <p
              className={
                isPasswordValid.length ? "text-green-500" : "text-red-500"
              }
            >
              {isPasswordValid.length ? "✓" : "✗"} 비밀번호는 8자 이상이어야
              합니다.
            </p>
            <p
              className={
                isPasswordValid.pattern ? "text-green-500" : "text-red-500"
              }
            >
              {isPasswordValid.pattern ? "✓" : "✗"} 영문, 숫자,
              특수문자(!@#$%^&*)만 사용 가능합니다.
            </p>
          </div>
        )}

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

      {/* AlertModal 컴포넌트 */}
      <AlertModal
        isOpen={isAlertOpen}
        message={alertMessage}
        onClose={handleCloseAlert}
      />
    </div>
  );
}
