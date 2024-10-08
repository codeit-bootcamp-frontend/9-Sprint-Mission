import styles from "./ReturnButton.module.css";
import returnButton from "@/src/assets/ic_back.png";
import Image from "next/image";
import Link from "next/link";

export default function ReturnButton() {
  return (
    <div className={styles.buttonContainer}>
      <Link href={"/boards"}>
        <button className={styles.returnButton} type="button">
          목록으로 돌아가기
          <Image src={returnButton} alt="돌아가기" width={24} height={24} />
        </button>
      </Link>
    </div>
  );
}
