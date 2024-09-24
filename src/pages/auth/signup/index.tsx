// pages/auth/signup/index.tsx
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import InputItem from "@/components/UI/InputItem";
import SocialLogin from "@/components/UI/SocialLogin";
import PasswordInput from "@/components/UI/PasswordInput";
import { signup } from "@/api/authApi";
import { SignupFormValues } from "@/types/auth";
import Logo from "@/images/logo/logo-auth.svg";
import Cookies from "js-cookie";

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        router.push("/");
      }
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({ mode: "onBlur" });

  const password = watch("password");
  const passwordConfirmation = watch("passwordConfirmation");

  useEffect(() => {
    if (password && passwordConfirmation) {
      trigger("passwordConfirmation");
    }
  }, [password, passwordConfirmation, trigger]);

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    const trimmedData: SignupFormValues = {
      email: data.email.trim(),
      nickname: data.nickname?.trim(),
      password: data.password.trim(),
      passwordConfirmation: data.passwordConfirmation.trim(),
    };

    try {
      const result = await signup(trimmedData);
      console.log(result);
      router.push("/login");
    } catch (error) {
      console.error("Error:", error);
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="mt-70px px-4 py-6 max-w-sm mx-auto md:max-w-2xl md:py-12 lg:py-15">
      <Link
        href="/"
        className="block mb-6 text-center md:mb-10"
        aria-label="홈으로 이동"
      >
        <Logo className="mx-auto" />
      </Link>

      <form
        className="mt-10 flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputItem<SignupFormValues>
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
          setValue={setValue}
          trigger={trigger}
          errorMessage={errors.email?.message}
        />

        <InputItem<SignupFormValues>
          id="nickname"
          label="닉네임"
          placeholder="닉네임을 입력해 주세요"
          register={register("nickname", {
            required: "닉네임을 입력해 주세요",
          })}
          setValue={setValue}
          trigger={trigger}
          errorMessage={errors.nickname?.message}
        />

        <PasswordInput
          id="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요"
          register={register("password", {
            required: "비밀번호를 입력해 주세요",
            minLength: {
              value: 8,
              message: "비밀번호를 8자 이상 입력해 주세요",
            },
            pattern: {
              value: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
              message: "영문, 숫자, 특수문자(!@#$%^&*)만 사용 가능합니다",
            },
          })}
          errorMessage={errors.password?.message}
        />

        <PasswordInput
          id="passwordConfirmation"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 한 번 입력해 주세요"
          register={register("passwordConfirmation", {
            required: "비밀번호를 다시 한 번 입력해 주세요",
            validate: (value) =>
              value === password || "비밀번호가 일치하지 않습니다",
          })}
          errorMessage={errors.passwordConfirmation?.message}
        />

        <button
          type="submit"
          disabled={!isValid}
          className="bg-blue-500 text-white py-3.5 px-8 rounded-full text-base font-bold w-full hover:bg-blue-600 focus:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          회원가입
        </button>
      </form>

      <SocialLogin />

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
