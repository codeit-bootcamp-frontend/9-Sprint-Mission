"use client";

import toast from "react-hot-toast";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { signupSchema } from "./zodSchema/signupSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface IPasswordField {
  title: string;
  name: keyof z.infer<typeof signupSchema>;
  visibleFunction: boolean;
  placeholder: string;
  clickFunction: () => void;
  error?: string;
}

const SignupPage = () => {
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      userEmail: "",
      userNickname: "",
      userPassword: "",
      userPassword2: "",
    },
  });
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePassword2, setVisiblePassword2] = useState(false);

  const handleVisiblePassword = () => {
    setVisiblePassword((prev) => !prev);
  };

  const handleVisiblePassword2 = () => {
    setVisiblePassword2((prev) => !prev);
  };

  const passwordArr: IPasswordField[] = [
    {
      title: "비밀번호",
      name: "userPassword",
      visibleFunction: visiblePassword,
      placeholder: "비밀번호를 입력해주세요.",
      clickFunction: handleVisiblePassword,
      error: errors.userPassword?.message,
    },
    {
      title: "비밀번호 확인",
      name: "userPassword2",
      visibleFunction: visiblePassword2,
      placeholder: "비밀번호를 다시 한 번 입력해주세요.",
      clickFunction: handleVisiblePassword2,
      error: errors.userPassword2?.message,
    },
  ];

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    try {
      const response = await axios.post("/api/auth/signup", {
        email: data.userEmail,
        nickname: data.userNickname,
        password: data.userPassword,
        passwordConfirmation: data.userPassword2,
      });

      if (response.status === 201) {
        toast.success("회원가입이 완료되었습니다.");
        reset();
        router.push("/signin");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("회원가입 실패", error.response?.data);
        toast.error(error.response?.data || "회원가입에 실패하였습니다.");
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
          className={`px-6 py-4 bg-panda-gray100 rounded-xl focus:outline-none form-ring transition ${
            errors.userEmail ? "focus-within:ring-panda-red" : ""
          }`}
        />
        {errors.userEmail && <span className="error-text-start">{errors.userEmail.message}</span>}
      </div>
      <div className="flex flex-col space-y-3">
        <label htmlFor="userNickname" className="text-sm font-bold md:text-lg">
          닉네임
        </label>
        <input
          {...register("userNickname")}
          type="text"
          id="userNickname"
          name="userNickname"
          placeholder="닉네임을 입력해주세요."
          className={`px-6 py-4 bg-panda-gray100 rounded-xl focus:outline-none form-ring transition ${
            errors.userNickname ? "focus-within:ring-panda-red" : ""
          }`}
        />
        {errors.userNickname && (
          <span className="error-text-start">{errors.userNickname.message}</span>
        )}
      </div>
      {passwordArr.map((item) => (
        <div key={item.name} className="flex flex-col space-y-3">
          <label htmlFor={item.name} className="text-sm font-bold md:text-lg">
            {item.title}
          </label>
          <div
            className={`flex items-center justify-between px-6 py-4 bg-panda-gray100 rounded-xl form-ring transition ${
              item.error ? "focus-within:ring-panda-red" : ""
            }`}
          >
            <input
              {...register(item.name)}
              type={item.visibleFunction ? "text" : "password"}
              id={item.name}
              name={item.name}
              placeholder={item.placeholder}
              className="bg-panda-gray100 w-full focus:outline-none"
            />
            <Image
              src={
                item.visibleFunction
                  ? "/icons/btn_visibility_off.svg"
                  : "/icons/btn_visibility_on.svg"
              }
              alt="보이기 버튼"
              width={24}
              height={24}
              onClick={item.clickFunction}
              className="cursor-pointer"
            />
          </div>
          {item.error && <span className="error-text-start">{item.error}</span>}
        </div>
      ))}
      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="px-32 py-4 bg-panda-theme hover:bg-panda-theme-hover disabled:bg-panda-gray400 rounded-full text-white text-xl font-semibold transition-colors"
      >
        {!isSubmitting ? "회원가입" : "잠시만 기다려주세요."}
      </button>
    </form>
  );
};

export default SignupPage;
