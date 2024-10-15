import Link from "next/link";
import Image from "next/image";
import styles from "./BackButton.module.scss";
import BackIcon from "@/assets/images/icons/ic_back.svg";
import { useRouter } from "next/router";
import { MouseEvent } from "react";

interface Props {
  href: string;
}

const BackButton = ({ href }: Props) => {
  const router = useRouter();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <Link href={href} onClick={handleClick} className={styles.backButton}>
      목록으로 돌아가기
      <Image src={BackIcon} alt="Back icon" />
    </Link>
  );
};

export default BackButton;
