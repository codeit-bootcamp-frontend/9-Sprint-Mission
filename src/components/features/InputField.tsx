// src/components/InputField.tsx
import React from "react";
import styles from "./InputField.module.scss";

interface InputFieldProps {
  id: string;
  type: "text" | "email" | "password";
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  value,
  placeholder,
  onChange,
  onBlur,
  errorMessage,
}) => {
  const hasError = Boolean(errorMessage);
  return (
    <div>
      <input
        id={id}
        type={type}
        value={value}
        className={`${styles["form-input"]} ${
          hasError ? styles["input-error"] : ""
        }`}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {errorMessage && (
        <div className={styles["error-msg"]}>{errorMessage}</div>
      )}
    </div>
  );
};

export default InputField;
