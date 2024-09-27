import Image from "next/image";
import styles from "./ArticleList.module.css";
import { ReactNode } from "react";
import { Label } from "./Label";

const options = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: undefined, // 시간 정보 제거
  minute: undefined,
  second: undefined,
  hour12: false, // 12시간 형식 사용 여부
};

interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
}

export const ArticleItem = ({
  articles,
  option,
}: {
  articles: Article[];
  option: string;
}) => {
  return (
    <div className={`${styles[`${option}-article-item`]}`}>
      {articles.map((article: Article) => (
        <li key={article.id} className={`${styles[`${option}-article-box`]}`}>
          {/* 게시글 제목  + 이미지 = 꽉차게 한블럭 */}
          <Label className={`${styles[`${option}-label`]}`} />
          <div className={`${styles[`${option}-article-title-image`]}`}>
            <div className={`${styles[`${option}-article-title`]}`}>
              {article.title}
            </div>
            <Image
              className={`${styles[`${option}-imageBox`]}`}
              src={article.image ? article.image : "/dummy.png"}
              width={72}
              height={72}
              alt=""
            />
          </div>
          {/* [이미지 + 닉네임 + 날짜] + [하트 + 좋아요] */}
          <div className={`${styles[`${option}-article-info`]}`}>
            {/* [이미지 + 닉네임 + 날짜] */}
            <div className={`${styles[`${option}-writer-inner`]}`}>
              <div className={`${styles[`${option}-writer-img`]}`}></div>
              <div className={`${styles[`${option}-writer-nickname`]}`}>
                {article.writer.nickname}
                {/* 좋아요  */}
                <div className={`${styles[`${option}-article-like`]}`}>
                  {article.likeCount}
                </div>
              </div>
              <div className={`${styles[`${option}-article-date`]}`}>
                {new Date(article.updatedAt).toLocaleString("ko-KR", options)}
              </div>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
};
