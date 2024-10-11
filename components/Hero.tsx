import Image from "next/image";
import Button from "./ButtonToGo";
import Link from "next/link";
import css from "./Hero.module.css";

export function Hero() {
  return (
    <div className={css.banner}>
      <div className={css.wrap}>
        <div className={css.intro}>
          <div className={css.text}>
            일상의 모든 물건을
            <br className={css.tablet} />
            거래해 보세요
          </div>
          <Link className={css.button} href="/">
            <Button>구경하러 가기</Button>
          </Link>
        </div>
        <div className={css.img}>
          <Image src="/Img_home_top.png" alt="상단 배너 이미지" layout="fill" />
        </div>
      </div>
    </div>
  );
}
