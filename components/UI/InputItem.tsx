import { ChangeEvent, KeyboardEvent, FocusEvent } from "react";
import styles from "./InputItem.module.scss";

interface InputItemProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextArea?: boolean;
  errorMessage?: string;
  type?: string;
  name?: string;
  required?: boolean;
}

const InputItem = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  onKeyDown,
  isTextArea,
  errorMessage,
  name,
  type = "text",
  required,
}: InputItemProps) => {
  return (
    <div className={styles.InputItem}>
      {label && <label htmlFor={id}>{label}</label>}

      {isTextArea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          name={name}
          type={type}
          required={required}
        />
      )}

      {errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};

export default InputItem;
