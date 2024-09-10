import { useEffect, useState } from "react";
import { getProductDetail } from "../../../shared/api/items/items";

function useProducts(productId) {
  const [itemDetail, setItemDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const responseInfo = await getProductDetail(productId);
        setItemDetail(responseInfo);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  return { itemDetail, loading, error };
}

export default useProducts;
