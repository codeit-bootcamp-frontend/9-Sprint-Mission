import { useForm } from "react-hook-form";
import Input, { InputValues } from "../components/Input";
import FormButton from "../components/FormButton";
import styles from "./LoginPage.module.css";
import Logo from "../assets/logo2.png";
import EasyLogin from "../components/EasyLogin";
import FormLink from "../components/FormLink";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm<InputValues>({
    mode: "onChange", // 입력이 변경될 때마다 유효성 검사를 수행
  });
  const onSubmit = async (data: InputValues) => {
    try {
      const res = await axios.post("/auth/signIn", {
        email: data.이메일,
        password: data.비밀번호,
      });
      const accessToken = res.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      //페이지 이동
      navigate("/");
      console.log("성공");
    } catch (error) {
      console.log("로그인 실패", error);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className={styles["form-wrap"]}>
      <h1>
        <img className={styles["title-img"]} src={Logo} alt="판다마켓" />
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles["form-container"]}
      >
        <Input
          label="이메일"
          register={register}
          required={true}
          placeholder="이메일을 입력해주세요"
          type="text"
          pattern={{
            value: /^\S+@\S+\.\S+$/,
            message: "잘못된 이메일입니다.",
          }}
        />
        {errors.이메일 && (
          <p className={styles["error-text"]}>{errors.이메일.message}</p>
        )}
        <Input
          label="비밀번호"
          register={register}
          required={true}
          placeholder="비밀번호를 입력해주세요"
          type="password"
          pattern={{
            value: /^.{8,}$/,
            message: "비밀번호를 8자 이상 입력해주세요",
          }}
        />
        {errors.비밀번호 && (
          <p className={styles["error-text"]}>{errors.비밀번호.message}</p>
        )}
        {}
        <button type="button" className={styles["show-hide-btn"]}></button>
        <FormButton
          type="submit"
          color={isValid ? "blue" : "gray"}
          disabled={!isValid || isSubmitting}
        >
          {"로그인"}
        </FormButton>
      </form>
      <EasyLogin />
      <FormLink
        containerContent="판다마켓이 처음이신가요?"
        to="/register"
        linkContent="회원가입"
      />
    </div>
  );
}
