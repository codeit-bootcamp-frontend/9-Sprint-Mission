import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../../api/itemApi";
import { InfoSection } from "./components/InfoSection";
import { Divider } from "./components/Divider";
import { CommentsSection } from "./components/CommentsSection";

function ItemDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductDetail(productId);
        console.log(response);
        setProduct(response);
      } catch (e) {
        console.error("Failed to fetch product:", e);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <InfoSection info={product} />
      <Divider />
      {/* <CommentsSection /> */}
    </div>
  );
}

export default ItemDetailPage;
