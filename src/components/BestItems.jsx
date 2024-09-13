import { useEffect, useState } from "react";
import { getPandaItems } from "../api";
import { PandaItemList } from "./PandaItemList";

export function BestItems({ width }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bestItems, setBestItems] = useState([]);

  // width에 따라 pagesize 초기값을 다르게 받아오기
  const initialPageSize = (width) => {
    if (width <= 780) {
      return 1;
    } else if ((width <= 991) & (width > 781)) {
      return 2;
    } else {
      return 4;
    }
  };

  //pagesize 상태 관리
  const [pageSize, setPageSize] = useState(() => initialPageSize(width));

  useEffect(() => {
    setPageSize(initialPageSize(width));
  }, [width]);
  const loadBestItems = async () => {
    setLoading(true);

    try {
      const response = await getPandaItems({
        page: 1,
        pageSize,
        orderBy: "favorite",
        search: "",
      });
      setBestItems(response.list || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBestItems();
  }, [pageSize]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section id="section-best">
      <div className="section-title-wrapper">
        <h2>베스트 상품</h2>
      </div>
      <div className="best-items">
        <PandaItemList items={bestItems} />
      </div>
    </section>
  );
}
