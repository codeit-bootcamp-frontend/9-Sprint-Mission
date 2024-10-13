// import styles from "./LoginPage.module.css";
import { useForm } from "react-hook-form";
import Input, { InputValues } from "../components/Input";
import FormButton from "../components/FormButton";
import styles from "./LoginPage.module.css";
import Logo from "../assets/logo2.png";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm<InputValues>({
    mode: "onChange", // 입력이 변경될 때마다 유효성 검사를 수행
  });
  const onSubmit = (data: InputValues) => {
    console.log(data);
  };

  return (
    <div className={styles["form-wrap"]}>
      <h1>
        <img src={Logo} alt="판다마켓" width={396} height={132} />
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
        {errors.이메일 && <p className={styles["error-text"]}>{errors.이메일.message}</p>}
        <Input
          label="비밀번호"
          register={register}
          required={true}
          placeholder="비밀번호를 입력해주세요"
          type="password"
          pattern={{
            value:
            /^.{8,}$/ ,
            message: "비밀번호를 8자 이상 입력해주세요",
          }}
        />
        {errors.비밀번호 && <p className={styles["error-text"]}>{errors.비밀번호.message}</p>}
        {}
        <button type="button" className={styles["show-hide-btn"]}></button>
        <FormButton
          color={isValid ? "blue" : "gray"}
          disabled={!isValid || isSubmitting}
        >
          {"로그인"}
        </FormButton>
      </form>
    </div>
  );
}
