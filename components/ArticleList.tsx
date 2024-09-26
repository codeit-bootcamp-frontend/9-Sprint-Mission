import { useEffect, useState, ChangeEvent } from "react";
import axios from "@/lib/axios";
import styles from "./ArticleList.module.css";
import Image from "next/image";
import { Dropdown } from "./Dropdown";
interface Query {
  page: number;
  pageSize: number;
  orderBy: string;
}
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
interface ArticleResponse {
  list: Article[];
}

export default function ArticleList({
  query,
  handleClickOrder,
  dropdownOpen,
}: {
  query: Query;
  handleClickOrder: (value: string) => void;
  dropdownOpen: boolean;
}) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [search, setSearch] = useState<string>("");

  //https://panda-market-api.vercel.app/articles?page=1&pageSize=10&orderBy=recent

  async function getArticles(query: Query) {
    const { page, pageSize, orderBy } = query;

    try {
      const res = await axios.get<ArticleResponse>(
        `/articles?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`
      );
      const list = res.data.list;
      setArticles(list);
    } catch (err) {
      if (err instanceof Error) setError(err);
      console.log("에러가 발생했습니다.");
    }
  }

  useEffect(() => {
    getArticles(query);
  }, [query]);

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: undefined, // 시간 정보 제거
    minute: undefined,
    second: undefined,
    hour12: false, // 12시간 형식 사용 여부
  };

  // input의 value -> search 상태로 관리
  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  // search 값으로 articles 배열을 필터링하는 함수
  const getFilteredData = (search: string): Article[] => {
    if (search === "") {
      return articles;
    }
    return articles.filter((article) =>
      article.title.toLowerCase().includes(search.toLowerCase())
    );
  };
  //검색어 필터 함수 호출
  const filteredArticles = getFilteredData(search);

  return (
    <>
      {error && <p>{error.message}</p>}
      {/* 검색 input + 정렬 드롭다운 */}
      <div className={styles["search-order-wrap"]}>
        <form className={styles["search-form"]}>
          <input
            className={styles["search-input"]}
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            value={search}
            onChange={handleChangeValue}
          ></input>
        </form>
        <Dropdown
          args={["최신순", "인기순"]}
          handleClickOrder={handleClickOrder}
          dropdownOpen={dropdownOpen}
        />
      </div>

      {filteredArticles.map((article: Article) => (
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
}
