import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import styles from "./AuthForm.module.scss";
import Logo from "@/assets/images/logo/logo.svg";

interface Props {
  children: ReactNode;
}

const AuthForm = ({ children }: Props) => {
  return (
    <section className={classNames("container", styles.AuthSection)}>
      <h1 className={styles.logo}>
        <Link href="/">
          <Image src={Logo} alt="판다마켓" width={369} height={123} />
        </Link>
      </h1>
      {children}
    </section>
  );
};

export default AuthForm;
