import { useEffect, useState } from "react";
import { getPandaItems } from "../api";
import { PandaItemList } from "./PandaItemList";

export function BestItems({ width }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bestItems, setBestItems] = useState([]);
  const [pageSize, setPageSize] = useState(4);

  const updatePageSize = (width) => {
    if (width <= 780) {
      setPageSize(1);
    } else if ((width <= 991) & (width > 781)) {
      setPageSize(2);
    } else {
      setPageSize(4); // 기본값
    }
  };

  useEffect(() => {
    updatePageSize(width);
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

  // const getVisibleItemsCount = () => {
  //   if (width <= 780) return 1;
  //   if (width <= 991) return 2;
  //   return 4;
  // };

  // const visibleItemsCount = getVisibleItemsCount();
  // const visibleItems = bestItems.slice(0, visibleItemsCount);

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
