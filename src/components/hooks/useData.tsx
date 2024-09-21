import { useState, useEffect } from "react";
import { getPandaMarket } from "../../api";
import usePageSize from "./usePageSize";
import { Products } from "../Types/Types";

const useData = () => {
  const pageSize = usePageSize("favorite");
  const [Items, setItems] = useState<Products[]>([]);

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
