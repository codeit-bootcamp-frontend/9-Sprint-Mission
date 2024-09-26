import Image from "next/image";
import styles from "./ArticleList.module.css";

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
export const ArticleItem = ({ articles }: { articles: Article[] }) => {
  return (
    <>
      <div className={styles["title-wrap"]}>
        <h1 className={styles["section-title"]}> 게시글</h1>
        <button className={styles["create-btn"]}>글쓰기</button>
        {/* Link 사용하기 */}
      </div>
      {articles.map((article: Article) => (
        <li key={article.id} className={styles["article-box"]}>
          {/* 게시글 제목  + 이미지 = 꽉차게 한블럭 */}
          <div className={styles["article-title-image"]}>
            <div className={styles["article-title"]}>{article.title}</div>
            <Image
              className={styles.imageBox}
              src={article.image ? article.image : "/dummy.png"}
              width={300}
              height={300}
              alt=""
            />
          </div>
          {/* [작성자 프로필 + 날짜] + [하트(before 처리) + 좋아요] */}
          <div className={styles["article-info"]}>
            {/* [작성자 + 날짜] */}
            <div className={styles["writer-info"]}>
              {/* 작성자 정보 api에서 받아와서 이미지 가져오기 */}
              <div className={styles["writer-img"]}></div>
              <div className={styles["writer-nickname"]}>
                {article.writer.nickname}
              </div>
              <div className={styles["article-date"]}>
                {new Date(article.updatedAt).toLocaleString("ko-KR", options)}
              </div>
            </div>
            <div className={styles["article-like"]}>{article.likeCount}</div>
          </div>
        </li>
      ))}
    </>
  );
};
