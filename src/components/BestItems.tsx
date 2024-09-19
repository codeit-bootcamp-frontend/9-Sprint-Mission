import { useEffect, useState } from "react";
import { getPandaItems } from "../api";
import { PandaItemList } from "./PandaItemList";
import { usePageSizeByWidth } from "../hooks/usePageSizeByWidth";

export function BestItems({ width, page }: { width: number; page: number }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [bestItems, setBestItems] = useState<[]>([]);

  const pageSizeObj = {
    mobile: 1,
    pad: 2,
    pc: 4,
  };

  const pageSize = usePageSizeByWidth(width, pageSizeObj);

  const loadBestItems = async () => {
    setLoading(true);

    try {
      const response = await getPandaItems({
        page,
        pageSize,
        orderBy: "favorite",
        search: "",
      });
      setBestItems(response.list || []);
    } catch (err) {
      if (err instanceof Error) setError(err);
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
    return <div>Error: {error.message}</div>;
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
