import { useEffect, useState } from "react";
import { getPandaItems } from "../api";
import { PandaItemList } from "./PandaItemList";

export function BestItems() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bestItems, setBestItems] = useState([]);

  const loadBestItems = async () => {
    setLoading(true);

    try {
      const response = await getPandaItems({
        page: 1,
        pageSize: 4,
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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section>
      <h2 className="section-title">
        <div>베스트 상품</div>
      </h2>
      <div className="best-items">
        <PandaItemList items={bestItems} />;
      </div>
    </section>
  );
}
