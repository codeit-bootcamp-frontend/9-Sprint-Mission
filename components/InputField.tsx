import styles from "./InputField.module.css";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

function InputField({ label, name, type, placeholder }: InputFieldProps) {
  return (
    <div className={styles.InputField}>
      <label className={styles.InputLabel} htmlFor={name}>
        {label}
      </label>
      <input
        className={styles.Input}
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputField;
