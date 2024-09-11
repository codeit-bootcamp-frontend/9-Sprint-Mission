import axios from "axios";
import AuthHeader from "./AuthHeader";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "./signupConstants";
import { useEffect, useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [serverError, setServerError] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePassword2, setVisiblePassword2] = useState(false);

  useEffect(() => {
    const checkToken = localStorage.getItem("accessToken");

    if (checkToken !== null) {
      navigate("/");
    }
  }, [navigate]);

  const handleVisiblePassword = () => {
    setVisiblePassword((prev) => !prev);
  };

  const handleVisiblePassword2 = () => {
    setVisiblePassword2((prev) => !prev);
  };

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    mode: "all",
    defaultValues: {
      userEmail: "",
      userNickname: "",
      userPassword: "",
      userPassword2: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const error = form.formState.errors;

  const handleSubmit = async (values: z.infer<typeof SignupSchema>) => {
    try {
      const response = await axios.post("https://panda-market-api.vercel.app/auth/signUp", {
        email: values.userEmail,
        nickname: values.userNickname,
        password: values.userPassword,
        passwordConfirmation: values.userPassword2,
      });

      if (response.status === 200) {
        form.reset();
        navigate("/signin");
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

  return (
    <AuthHeader>
      <div className="signupFormWrapper">
        <form onSubmit={form.handleSubmit(handleSubmit)} className="authForm">
          <div className={`${error.userEmail ? "formItemBox formError" : "formItemBox"} email`}>
            <label htmlFor="userEmail">이메일</label>
            <input
              {...form.register("userEmail")}
              type="email"
              id="userEmail"
              name="userEmail"
              placeholder="이메일을 입력해주세요."
            />
            {error && <span>{error.userEmail?.message}</span>}
          </div>
          <div
            className={`${error.userNickname ? "formItemBox formError" : "formItemBox"} nickname`}
          >
            <label htmlFor="userNickname">닉네임</label>
            <input
              {...form.register("userNickname")}
              type="text"
              id="userNickname"
              name="userNickname"
              placeholder="닉네임을 입력해주세요."
            />
            {error && <span>{error.userNickname?.message}</span>}
          </div>
          <div className="formItemBox">
            <label htmlFor="userPassword">비밀번호</label>
            <div className={`${error.userPassword ? "passwordBox formError" : "passwordBox"}`}>
              <input
                {...form.register("userPassword")}
                type={visiblePassword ? "text" : "password"}
                id="userPassword"
                name="userPassword"
                placeholder="비밀번호를 입력해주세요."
              />
              <img
                src={
                  visiblePassword ? "/icons/btn_visibility_off.svg" : "/icons/btn_visibility_on.svg"
                }
                alt="보이기 버튼"
                className="visiblePassword"
                onClick={handleVisiblePassword}
              />
            </div>
            {error && <span>{error.userPassword?.message}</span>}
          </div>
          <div className="formItemBox">
            <label htmlFor="userPassword2">비밀번호 확인</label>
            <div className={`${error.userPassword2 ? "passwordBox formError" : "passwordBox"}`}>
              <input
                {...form.register("userPassword2")}
                type={visiblePassword2 ? "text" : "password"}
                id="userPassword2"
                name="userPassword2"
                placeholder="비밀번호를 다시 한 번 입력해주세요."
              />
              <img
                src={
                  visiblePassword2
                    ? "/icons/btn_visibility_off.svg"
                    : "/icons/btn_visibility_on.svg"
                }
                alt="보이기 버튼"
                className="visiblePassword"
                onClick={handleVisiblePassword2}
              />
            </div>
            {error && <span>{error.userPassword2?.message}</span>}
          </div>
          {serverError && (
            <span className="serverErrorMsg">
              회원가입 중 오류가 발생하여 가입되지 않았습니다. <br /> 잠시 후 다시 시도해주세요.
            </span>
          )}
          {apiError !== "" && <span className="serverErrorMsg">{apiError}</span>}
          <button type="submit" className="submitBtn" disabled={!form.formState.isValid}>
            {isLoading ? "잠시만 기다려주세요" : "회원가입"}
          </button>
        </form>
      </div>
    </AuthHeader>
  );
};

export default Signup;
