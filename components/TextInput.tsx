import { ReactNode } from "react";
import styles from "./TextInput.module.css";

interface Props {
  label: string;
  placeholder?: string;
  children?: ReactNode;
  required?: boolean;
  hidden?: boolean;
}
export const TextInput = ({
  label,
  placeholder,
  children,
  required,
  hidden,
}: Props) => {
  return (
    <div className={styles["label-input"]}>
      <label className={styles.label} htmlFor={label}>
        {children}
      </label>
      <input
        className={styles.input}
        id={label}
        name={label}
        type="text"
        placeholder={placeholder}
        required={required}
        hidden={hidden}
      ></input>
    </div>
  );
};
