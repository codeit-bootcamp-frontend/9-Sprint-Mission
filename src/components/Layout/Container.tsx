import { ReactNode } from "react";
import styles from "./Container.module.css";

export default function Contanier({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
