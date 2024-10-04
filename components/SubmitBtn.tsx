import styles from "./SubmitBtn.module.css";

interface Props {
  children: string;
  disabled: boolean;
}
export default function SubmitBtn({ children, disabled }: Props) {
  return (
    <>
      <button
        className={`${styles.button} ${disabled ? "" : styles.active}`}
        type="submit"
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
}
