import { ReactNode } from "react";
import styles from "./FormLink.module.css";
import { Link } from "react-router-dom";

interface FormLinkProps {
  containerContent: string;
  linkContent: string;
  to: string;
}

export default function FormLink({ containerContent, linkContent,to }: FormLinkProps) {
  return (
    <div className={styles["register-link-container"]}>
      {containerContent}
      <Link to={to} className={styles.register}>
          {linkContent}
        </Link>
    </div>
  );
}
