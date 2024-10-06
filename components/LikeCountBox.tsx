import styles from "@/components/LikeCountBox.module.css";
import Image from "next/image";
import { ReactNode } from "react";

interface LikeCount {
  children: ReactNode;
}
export default function LikeCountBox({children} :LikeCount) {
  return (
    <>
      <div className={styles["like-count-box"]}>
        <Image src="/ic_heart.png" alt="" width={26.8} height={23.3}></Image>
        <span>{children}</span>
      </div>
    </>
  );
}
