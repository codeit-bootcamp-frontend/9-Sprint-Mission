import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail, getProductMessages } from "../../api/itemApi";
import { ProductInfoSection } from "./components/ProductInfoSection/ProductInfoSection";
import { Divider } from "../../components/UI/Divider";
import { ProductCommentsSection } from "./components/ProductCommentsSection/ProductCommentsSection";
import { BackToProductListButton } from "./components/BackToProductListButton/BackToProductListButton";
import S from "./ProductDetailPage.styles";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [productInfo, setProductInfo] = useState(null);
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
    fetchData(getProductDetail, setProductInfo, "Failed to fetch Product Info");
    fetchData(
      getProductMessages,
      setProductMessages,
      "Failed to fetch Product Messages"
    );
  }, [productId]);

  if (!productInfo) {
    return <div>Loading...</div>;
  }

  return (
    <S.Wrapper>
      <ProductInfoSection info={productInfo} />
      <Divider />
      <ProductCommentsSection info={productMessages} />
      <BackToProductListButton />
    </S.Wrapper>
  );
}
