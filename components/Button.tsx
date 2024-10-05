import styles from "./Button.module.css";

interface Props {
  children: string;
}
export default function Button({ children }: Props) {
  return (
    <>
      <button className={`${styles.button}`} type="button">
        {children}
      </button>
    </>
  );
}
