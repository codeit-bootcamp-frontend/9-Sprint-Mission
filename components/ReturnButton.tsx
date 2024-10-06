import styles from "./ReturnButton.module.css";

import Button from "./Button";
import { useRouter } from "next/router";
import Image from "next/image";

function ReturnButton() {
  const router = useRouter();

  return (
    <div className={styles.returnButtonBox}>
      <Button
        onClick={() => {
          router.back();
        }}
        width="240px"
        height="48px"
        radius="40px"
      >
        <div className={styles.returnButton}>
          <span>목록으로 돌아가기</span>
          <Image src="/images/return.svg" alt="화살표" width="24" height="24" />
        </div>
      </Button>
    </div>
  );
}

export default ReturnButton;
