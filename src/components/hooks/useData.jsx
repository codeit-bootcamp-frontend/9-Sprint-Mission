import { useState, useEffect } from "react";
import { getPandaMarket } from "../../../api";
import usePageSize, { orderByType } from "./usePageSize";

const useData = () => {
  const pageSize = usePageSize(orderByType.favorite);
  const [Items, setItems] = useState([]);

  useEffect(() => {
    const fetchPandaMarket = async () => {
      const products = await getPandaMarket();
      setItems(products.list);
    };

    fetchPandaMarket();
  }, [pageSize]);

  return Items;
};

export default useData;
