import Head from "next/head";
import Link from "next/link";
import styles from "../styles/home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>판다마켓</title>
      </Head>
      <main>
        <section className={styles.banner}>
          <div className={styles["banner-wrap"]}>
            <div className={styles["banner-txt"]}>
              <p>
                일상의 모든 물건을
                <br />
                거래해 보세요
              </p>
              <span className="btn-link">
                <Link href="/items">구경하러 가기</Link>
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
