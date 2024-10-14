import { useForm } from "react-hook-form";
import Input, { InputValues } from "../components/Input";
import FormButton from "../components/FormButton";
import styles from "./RegisterPage.module.css";
import Logo from "../assets/logo2.png";
import EasyLogin from "../components/EasyLogin";
import FormLink from "../components/FormLink";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, isSubmitting, errors },
  } = useForm<InputValues>({
    mode: "onChange", // 입력이 변경될 때마다 유효성 검사를 수행
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken) {
      navigate('/')
    }
  },[navigate])

  const password = watch("비밀번호"); //비밀번호 확인을 위해 감시

  const onSubmit = async (data: InputValues) => {
    try {
      await axios.post("/auth/signUp", {
        email: data.이메일,
        nickname: data.닉네임,
        password: data.비밀번호,
        passwordConfirmation: data.비밀번호확인,
      });
      navigate('/login')

    } catch (error) {
      console.log("회원 가입 실패:", error);
    }
  };

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
          label="닉네임"
          register={register}
          required={true}
          placeholder="닉네임을 입력해주세요"
          type="text"
          pattern={{
            value: /^.{2,}$/,
            message: "닉네임을 입력해주세요.",
          }}
        />
        {errors.닉네임 && (
          <p className={styles["error-text"]}>{errors.닉네임.message}</p>
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
        <Input
          label="비밀번호확인"
          register={register}
          required={true}
          placeholder="비밀번호를 다시 한 번 입력해주세요"
          type="password"
          validate={(value) =>
            value === password || "비밀번호가 일치하지 않습니다"
          }
        />
        {errors.비밀번호확인 && (
          <p className={styles["error-text"]}>{errors.비밀번호확인.message}</p>
        )}

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
        containerContent="이미회원이신가요?"
        to="/login"
        linkContent="로그인"
      />
    </div>
  );
}
