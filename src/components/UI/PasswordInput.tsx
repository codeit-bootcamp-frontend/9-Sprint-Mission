// src/components/UI/InputItem.tsx
import React, { useState } from "react";
import EyeInvisibleIcon from "/images/icons/eye-invisible.svg";
import EyeVisibleIcon from "/images/icons/eye-visible.svg";
import InputItem from "./InputItem";
import { UseFormRegisterReturn } from "react-hook-form";

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
          <EyeVisibleIcon className="mt-8 w-6 h-6 md:mt-10" />
        ) : (
          <EyeInvisibleIcon className="mt-8 w-6 h-6 md:mt-10" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
