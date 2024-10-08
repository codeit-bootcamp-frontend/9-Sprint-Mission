import Link from "next/link";
import styles from "@/styles/NotFound.module.scss";
import Button from "@/components/UI/Button/Button";

export default function NotFound() {
  return (
    <>
      <div className={styles.notFound}>
        <div className={styles.content}>
          <p>
            찾을 수 없는 페이지입니다.
            <br />
            요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요 :)
          </p>
        </div>
        <Link href="/">
          <Button>홈으로 이동</Button>
        </Link>
      </div>
    </>
  );
}
