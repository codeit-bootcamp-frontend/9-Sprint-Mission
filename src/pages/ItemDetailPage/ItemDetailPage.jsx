import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail, getProductMessages } from "../../api/itemApi";
import { InfoSection } from "./components/InfoSection";
import { Divider } from "./components/Divider";
import { CommentsSection } from "./components/CommentsSection";

function ItemDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [productMessages, setProductMessages] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductDetail(productId);
        setProduct(response);
      } catch (e) {
        console.error("Failed to fetch productInfo:", e);
      }
    };
    const fetchProductMessage = async () => {
      try {
        const response = await getProductMessages(productId);
        console.log(response);
        setProductMessages(response);
      } catch (e) {
        console.error("Failed to fetch productMessages:", e);
      }
    };
    fetchProduct();
    fetchProductMessage();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <InfoSection info={product} />
      <Divider />
      <CommentsSection info={productMessages} />
    </div>
  );
}

export default ItemDetailPage;
