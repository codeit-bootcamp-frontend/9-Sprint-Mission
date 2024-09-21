import { useEffect, useState } from "react";
import { getPandaMarket } from "../../../api";
import ItemCard from "./ItemCard";
import usePageSize from "../../hooks/usePageSize";
import { Products } from "../../Types/Types";

const BestProduct = () => {
  const pageSize = usePageSize("favorite");
  const [bestItems, setBestItems] = useState<Products[]>([]);

  useEffect(() => {
    const fetchPandaMarket = async () => {
      const products = await getPandaMarket({
        orderBy: "favorite",
        pageSize,
      });
      setBestItems(products.list);
    };

    fetchPandaMarket();
  }, [pageSize]);

  return (
    <div id="product-best">
      <h2 className="product-tit">베스트 상품</h2>

      <ul className="product-wrap">
        {bestItems?.map((item) => <ItemCard item={item} key={item.id} />)}
      </ul>
    </div>
  );
};

export default BestProduct;
