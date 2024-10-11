import Image from "next/image";
import css from "./HeroBottom.module.css";

export function HeroBottom() {
  return (
    <div className={css.banner}>
      <div className={css.wrap}>
        <div className={css.intro}>
          <div className={css.text}>
            믿을 수 있는
            <br />
            판다마켓 중고 거래
          </div>
        </div>
        <div className={css.img}>
          <Image
            src="/Img_home_bottom.png"
            alt="상단 배너 이미지"
            layout="fill"
          />
        </div>
      </div>
    </div>
  );
}
