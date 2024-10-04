import styles from "@/components/LikeCountBox.module.css";
import Image from "next/image";

export default function LikeCountBox() {
  return (
    <>
      <div className={styles["like-count-box"]}>
        <Image src="/ic_heart.png" alt="" width={26.8} height={23.3}></Image>
        <span>123</span>
      </div>
    </>
  );
}
