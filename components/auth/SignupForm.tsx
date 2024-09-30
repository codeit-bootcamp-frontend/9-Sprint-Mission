import { ISignupForm } from "@/app/(auth)/authTypeShare";
import { SignupSchema } from "@/app/(auth)/signup/signupContants";
import { cls } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

interface IPasswordField {
  title: string;
  name: keyof z.infer<typeof SignupSchema>;
  visibleFunction: boolean;
  placeholder: string;
  clickFunction: () => void;
  error?: string;
}

const SignupForm = ({ form, isLoading, error }: ISignupForm) => {
  const router = useRouter();

  const [apiError, setApiError] = useState("");
  const [serverError, setServerError] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePassword2, setVisiblePassword2] = useState(false);

  const handleVisiblePassword = () => {
    setVisiblePassword((prev) => !prev);
  };

  const handleVisiblePassword2 = () => {
    setVisiblePassword2((prev) => !prev);
  };

  const handleSubmit = async (values: z.infer<typeof SignupSchema>) => {
    try {
      const response = await axios.post("/api/auth/signup", {
        email: values.userEmail,
        nickname: values.userNickname,
        password: values.userPassword,
        passwordConfirmation: values.userPassword2,
      });

      if (response.status === 200) {
        form.reset();
        router.push("/signin");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("회원가입 post 요청에서 API 요청 오류 발생", error);
        setApiError(error.response?.data);
      } else {
        console.error("회원가입 post 요청에서 알 수 없는 오류 발생", error);
        setServerError(true);
      }
    }
  };

  const passwordArr: IPasswordField[] = [
    {
      title: "비밀번호",
      name: "userPassword",
      visibleFunction: visiblePassword,
      placeholder: "비밀번호를 입력해주세요.",
      clickFunction: handleVisiblePassword,
      error: error.userPassword?.message,
    },
    {
      title: "비밀번호 확인",
      name: "userPassword2",
      visibleFunction: visiblePassword2,
      placeholder: "비밀번호를 다시 한 번 입력해주세요.",
      clickFunction: handleVisiblePassword2,
      error: error.userPassword2?.message,
    },
  ];

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
          className={cls("px-6 py-4 bg-[--color-gray100] rounded-xl focus:outline-none form-ring transition-all", error.userEmail ? "focus-within:ring-red-500" : "")}
        />
        {error && <span className="error-text-start">{error.userEmail?.message}</span>}
      </div>
      <div className="flex flex-col space-y-3">
        <label htmlFor="userNickname" className="text-sm font-bold md:text-lg">
          닉네임
        </label>
        <input
          {...form.register("userNickname")}
          type="text"
          id="userNickname"
          name="userNickname"
          placeholder="닉네임을 입력해주세요."
          className={cls("px-6 py-4 bg-[--color-gray100] rounded-xl focus:outline-none form-ring transition-all", error.userNickname ? "focus-within:ring-red-500" : "")}
        />
        {error && <span className="error-text-start">{error.userNickname?.message}</span>}
      </div>
      {passwordArr.map((item) => (
        <div key={item.name} className="flex flex-col space-y-3">
        <label htmlFor={item.name} className="text-sm font-bold md:text-lg">
          {item.title}
        </label>
        <div className={cls("flex items-center justify-between px-6 py-4 bg-[--color-gray100] rounded-xl form-ring transition-all", item.error ? "focus-within:ring-red-500" : "")}>
          <input
            {...form.register(item.name)}
            type={item.visibleFunction ? "text" : "password"}
            id={item.name}
            name={item.name}
            placeholder={item.placeholder}
            className="bg-[--color-gray100] w-full focus:outline-none"
          />
          <Image
            src={item.visibleFunction ? "/icons/btn_visibility_off.svg" : "/icons/btn_visibility_on.svg"}
            alt="보이기 버튼"
            width={24}
            height={24}
            onClick={item.clickFunction}
            className="cursor-pointer"
          />
        </div>
        {error && <span className="error-text-start">{item.error}</span>}
      </div>
      ))}
      {serverError && (
        <span className="error-text-center">
          회원가입 중 오류가 발생하여 가입되지 않았습니다. <br /> 잠시 후 다시 시도해주세요.
        </span>
      )}
      {apiError !== "" && <span className="error-text-center">{apiError}</span>}
      <button
        type="submit"
        disabled={!form.formState.isValid}
        className="px-32 py-4 bg-[--color-theme] hover:bg-[--color-theme-hover] disabled:bg-[--color-gray400] rounded-full text-white text-xl font-semibold transition-all"
      >
        {!isLoading ? "회원가입" : "잠시만 기다려주세요."}
      </button>
    </form>
  );
};

export default SignupForm;
