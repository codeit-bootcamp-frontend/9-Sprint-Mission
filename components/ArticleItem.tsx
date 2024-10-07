import Image from "next/image";
import styles from "./ArticleList.module.css";
import { Label } from "./Label";
import Link from "next/link";
import { Article } from "@/types/types";
import { getDate } from "@/utils/getDate";

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
          <Link href={`/boards/${article.id}`}>
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
                  {getDate(article.updatedAt)}
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </div>
  );
};
