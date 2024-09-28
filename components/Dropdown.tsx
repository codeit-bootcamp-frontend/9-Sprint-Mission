import styles from "@/components/Dropdown.module.css";
import Image from "next/image";

export default function Dropdown() {
  return (
    <>
      <div className={styles["order-container"]}>
        <button className={styles["sort-box"]} type="button">최신순
          <Image src="/ic_arrow_down.png" alt="" width={24} height={24} />
        </button>
        <div className={styles["order-btn"]}>
          <button type="button">최신순</button>
          <button type="button">좋아요순</button>
        </div>
      </div>
    </>
  );
}
