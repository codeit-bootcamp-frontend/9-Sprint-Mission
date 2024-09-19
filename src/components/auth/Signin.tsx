import axios from "axios";
import AuthHeader from "./AuthHeader";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SigninSchema } from "./signinConstants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Signin = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [serverError, setServerError] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  useEffect(() => {
    const checkToken = localStorage.getItem("accessToken");

    if (checkToken !== null) {
      navigate("/");
    }
  }, [navigate]);

  const handleVisiblePassword = () => {
    setVisiblePassword((prev) => !prev);
  };

  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    mode: "all",
    defaultValues: {
      userEmail: "",
      userPassword: ""
    }
  });

  const isLoading = form.formState.isSubmitting;
  const error = form.formState.errors;

  const handleSubmit = async (values: z.infer<typeof SigninSchema>) => {
    try {
      const response = await axios.post("https://panda-market-api.vercel.app/auth/signIn", {
        email: values.userEmail,
        password: values.userPassword
      });

      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("로그인 POST 요청에서 API 오류 발생", error);
        setApiError(error.response?.data.message);
      } else {
        console.error("로그인 POST 요청에서 알 수 없는 오류 발생", error);
        setServerError(true);
      }
    }
  }

  return (
    <AuthHeader>
      <div className="signinFormWrapper">
        <form onSubmit={form.handleSubmit(handleSubmit)} className="authForm">
          <div className={`${error.userEmail ? "formItemBox formError" : "formItemBox"} email`}>
            <label htmlFor="userEmail">이메일</label>
            <input {...form.register("userEmail")} type="email" id="userEmail" name="userEmail" placeholder="이메일을 입력해주세요." />
            {error && <span>{error.userEmail?.message}</span>}
          </div>
          <div className="formItemBox">
            <label htmlFor="userPassword">비밀번호</label>
            <div className={`${error.userPassword ? "passwordBox formError" : "passwordBox"}`}>
              <input {...form.register("userPassword")} type={visiblePassword ? "text" : "password"} id="userPassword" name="userPassword" placeholder="비밀번호를 입력해주세요." /> 
              <img src={visiblePassword ? "/icons/btn_visibility_off.svg" : "/icons/btn_visibility_on.svg"} alt="보이기 버튼" className="visiblePassword" onClick={handleVisiblePassword} />
            </div>
            {error && <span>{error.userPassword?.message}</span>}
          </div>
          {serverError && (
            <span className="serverErrorMsg">
              로그인 중 오류가 발생하였습니다. <br /> 잠시 후 다시 시도해주세요.
            </span>
          )}
          {apiError !== "" && <span className="serverErrorMsg">{apiError}</span>}
          <button type="submit" className="submitBtn" disabled={!form.formState.isValid}>
            {isLoading ? "잠시만 기다려주세요" : "로그인"}
          </button>
        </form>
      </div>
    </AuthHeader>
  )
}

export default Signin;