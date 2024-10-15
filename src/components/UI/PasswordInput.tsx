// src/components/UI/InputItem.tsx
import React, { useState } from "react";
import Image from "next/image";
import InputItem from "./InputItem";
import { UseFormRegisterReturn } from "react-hook-form";

// public 폴더 경로 문자열로 대체
const EYE_INVISIBLE_ICON = "/images/icons/eye-invisible.png";
const EYE_VISIBLE_ICON = "/images/icons/eye-visible.png";

interface PasswordInputProps {
  id: string;
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  errorMessage?: string;
}

const PasswordInput = ({
  id,
  label,
  placeholder,
  register,
  errorMessage,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <InputItem
        id={id}
        label={label}
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        register={register}
        errorMessage={errorMessage}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-4 top-1/2 transform -translate-y-1/2"
        aria-label="비밀번호 보기"
      >
        {showPassword ? (
          <Image
            src={EYE_VISIBLE_ICON}
            width={24}
            height={24}
            alt="비밀번호 보기 이미지 버튼"
            className="mt-8 w-6 h-6 md:mt-10"
          />
        ) : (
          <Image
            src={EYE_INVISIBLE_ICON}
            width={24}
            height={24}
            alt="비밀번호 감추기 이미지 버튼"
            className="mt-8 w-6 h-6 md:mt-10"
          />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
