import { FormEvent, useCallback, useEffect, useState } from "react";
import { getPandaItems } from "../api";
import { PandaItemList } from "./PandaItemList";
import { NavLink } from "react-router-dom";
import searchIcon from "../img/ic_search.png";
import Container from "./Container";
import { usePageSizeByWidth } from "../hooks/usePageSizeByWidth";

interface Props {
  width: number;
  page: number;
  getTotalPage: (total: number) => void;
}

interface Item {
  id: number;
  name: string;
  images: string;
  price: number;
  favoriteCount: number;
}
export function AllItems({ width, page, getTotalPage }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [allItems, setAllItems] = useState<Item[]>([]);

  const [orderBy, setOrderBy] = useState("recent");
  const [search, setSearch] = useState("");

  const pageSizeObj = {
    mobile: 4,
    pad: 6,
    pc: 10,
  };

  const pageSize = usePageSizeByWidth(width, pageSizeObj);

  const loadAllItems = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await getPandaItems({
        page,
        pageSize,
        orderBy,
        search,
      });
      setAllItems(response.list || []);
      const totalPage = Math.ceil(response.totalCount / pageSize);
      getTotalPage(totalPage);
    } catch (err) {
      if (err instanceof Error) setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, orderBy]);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const searchInput = target["search"] as HTMLInputElement;
    setSearch(searchInput.value.trim());
  };

  const handleOrderChange = (newOrderBy: string) => {
    setOrderBy(newOrderBy);
  };

  useEffect(() => {
    loadAllItems();
  }, [page, pageSize, orderBy, search]);

  //로딩 처리 & 에러 처리
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section id="section-all">
      <div className="section-title-wrapper">
        <h2>전체 상품</h2>
        <form className="item-option" onSubmit={handleSearchSubmit}>
          {/* 상품 검색 */}
          <div className="search-wrapper">
            <img src={searchIcon} alt="검색아이콘" width="24" height="24" />
            <input
              className="search-input"
              name="search"
              placeholder="검색할 상품을 입력해주세요"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
          </div>
          {/* 상품 등록 버튼 */}
          <NavLink to="/additem">
            <button type="button" className="add-btn">
              상품 등록하기
            </button>
          </NavLink>
          {/* 정렬 기준 드롭다운 */}
          <Container currentOrder={orderBy} onOrderChange={handleOrderChange} />
        </form>
      </div>
      {/* 아이템 보여주기 */}
      <div className="all-items">
        <PandaItemList items={allItems} />
      </div>
    </section>
  );
}
// 검색 후 키워드 리셋됨
