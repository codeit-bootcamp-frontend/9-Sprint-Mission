import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail, getProductMessages } from "../../api/itemApi";
import { InfoSection } from "./components/InfoSection";
import { Divider } from "./components/Divider";
import { CommentsSection } from "./components/CommentsSection";
import { BackToProductListButton } from "../../components/UI/BackToProductListButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
  max-width: 1200px;
  width: 100%;
  height: 496px;
  margin: 0 auto;
  gap: 24px;
`;

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
    // fetchProductMessage();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <InfoSection info={product} />
      <Divider />
      <CommentsSection info={productMessages} />
      <BackToProductListButton />
    </Container>
  );
}

export default ItemDetailPage;
