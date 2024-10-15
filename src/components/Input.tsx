import { UseFormRegister, Path } from "react-hook-form";
import styles from "./Input.module.css";

export interface InputValues {
  이메일: string;
  비밀번호: string;
  닉네임: string;
  비밀번호확인: string;
}

export type InputProps = {
  label: Path<InputValues>; //필드 이름
  register: UseFormRegister<InputValues>; // useForm에서 받아온 함수
  required: boolean;
  placeholder: string;
  type?: string;
  validate?: (value: string) => boolean | string;
  pattern?: { value: RegExp; message: string }; // 각 인풋별 패턴 속성 추가
};

export default function Input({
  label,
  register,
  required = false,
  placeholder,
  type = "text",
  pattern,
  validate,
}: InputProps) {
  return (
    <div className={styles["input-container"]}>
      <label htmlFor={label} className={styles["input-label"]}>
        {label}
      </label>
      <input
        id={label}
        {...register(label, { required, pattern, validate })}
        className={styles["input"]}
        placeholder={placeholder}
        type={type}
      ></input>
    </div>
  );
}
