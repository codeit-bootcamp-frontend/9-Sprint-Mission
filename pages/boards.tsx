import ArticleList from "@/components/ArticleList";
import BestArticleList from "@/components/BestArticleList";
import { throttle } from "@/lib/throttle";
import { useEffect, useState } from "react";
import { Article, Query } from "@/types/types";
import axios from "axios";

export const getStaticProps = async () => {
  try {
    const mainArticleRes = await axios.get(
      `/articles?page=1&pageSize=10&orderBy=recent`
    );

    const bestArticleRes = await axios.get(
      `/articles?page=1&pageSize=3&orderBy=like`
    );

    return {
      props: {
        mainArticles: mainArticleRes.data.list,
        bestArticles: bestArticleRes.data.list,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        mainArticles: [],
        bestArticles: [],
      },
    };
  }
};
// 하위 컴포넌트에 정적 prop 넘겨주기
export default function Boards({
  mainArticles,
  bestArticles,
}: {
  mainArticles: Article[];
  bestArticles: Article[];
}) {
  // 윈도우 너비 받아와서 상태 관리
  const initialWidth = typeof window !== "undefined" ? window.innerWidth : 1024;
  const [width, setWidth] = useState<number>(initialWidth);

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const [mainQuery, setMainQuery] = useState<Query>({
    page: 1,
    pageSize: 10,
    orderBy: "recent",
    keyword: "",
  });

  const BestPageSizeObj = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  };
  // pageSize 초기값 설정하는 함수
  function getInitialPageSize(width: number) {
    if (width >= 992) {
      return BestPageSizeObj.desktop;
    } else if (width >= 768 && width < 992) {
      return BestPageSizeObj.tablet;
    } else {
      return BestPageSizeObj.mobile;
    }
  }
  const [bestQuery, setBestQuery] = useState<Query>({
    page: 1,
    pageSize: getInitialPageSize(width || initialWidth),
    orderBy: "like",
  });

  // width 를 받아서 베스트 게시글 pageSize 를 변경하는 함수
  const getBestArticlePageSize = (width: number) => {
    let newPageSize = getInitialPageSize(width);
    setBestQuery((prev) => ({
      ...prev,
      pageSize: newPageSize,
    }));
  };

  // 브라우저에서 리사이즈 이벤트가 발생하면 handleResize 함수를 호출 -> width 상태 관리
  // throttle 적용
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
      getBestArticlePageSize(newWidth);
    };
    const throttledResize = throttle(handleResize, 500);
    window.addEventListener("resize", throttledResize);
    return () => {
      window.removeEventListener("resize", throttledResize);
    };
  }, []);

  //모달 클릭했을때 게시글 정렬 방식 변경
  const handleClickOrder = (order: string): void => {
    setMainQuery((prev) => ({
      ...prev,
      orderBy: order,
    }));
    setDropdownOpen(false);
  };

  const handleClickOrderOpen = (): void => {
    setDropdownOpen(!dropdownOpen);
  };

  // 검색어가 입력됐을때 Main query를 수정하는 함수
  const handleChangeSearchQuery = (search: string): void => {
    setMainQuery((prev) => ({ ...prev, keyword: search }));
  };

  return (
    <div className="container">
      <section className="section">
        <BestArticleList initialArticles={bestArticles} query={bestQuery} />
      </section>

      <section className="section">
        <ArticleList
          initialArticles={mainArticles}
          query={mainQuery}
          handleClickOrder={handleClickOrder}
          dropdownOpen={dropdownOpen}
          handleClickOrderOpen={handleClickOrderOpen}
          handleChangeSearchQuery={handleChangeSearchQuery}
        />
      </section>
    </div>
  );
}
