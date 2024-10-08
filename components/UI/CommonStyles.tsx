import { ReactNode } from "react";
import styles from "./CommonStyles.module.scss";

interface Props {
  children: ReactNode;
}

export const TitleSection = ({ children }: Props) => {
  return <div className={styles.titleWrap}>{children}</div>;
};

export const SectionTitle = ({ children }: Props) => {
  return <h2 className={styles.title}>{children}</h2>;
};

export const LineDividerWidth = () => {
  return <div className={styles.lineDividerWidth}></div>;
};

export const LineDividerHieght = () => {
  return <div className={styles.lineDividerHieght}></div>;
};
