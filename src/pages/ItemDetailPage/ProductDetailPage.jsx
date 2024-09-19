import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getProductDetail, getProductMessages } from "../../api/itemApi";
import { ProductInfoSection } from "./components/ProductInfoSection";
import { Divider } from "./components/Divider";
import { ProductCommentsSection } from "./components/ProductCommentsSection";
import { BackToProductListButton } from "./components/BackToProductListButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  gap: 24px;

  @media (max-width: 745px) {
    width: 696px;
    padding: 0;
  }

  @media (max-width: 377px) {
    width: 344px;
  }
`;

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [productMessages, setProductMessages] = useState(null);

  useEffect(() => {
    const fetchData = async (fetchFunction, setState, errorMessage) => {
      try {
        const response = await fetchFunction(productId);
        setState(response);
      } catch (e) {
        console.error(errorMessage, e);
      }
    };
    fetchData(getProductDetail, setProduct, "Failed to fetch Products");
    fetchData(
      getProductMessages,
      setProductMessages,
      "Failed to fetch Product Messages"
    );
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <ProductInfoSection info={product} />
      <Divider />
      <ProductCommentsSection info={productMessages} />
      <BackToProductListButton />
    </Container>
  );
}
