import styles from "./LoginBtn.module.css";

export function LoginBtn({ children }: { children: string }) {
  return <button className={styles.loginBtn}>{children}</button>;
}
