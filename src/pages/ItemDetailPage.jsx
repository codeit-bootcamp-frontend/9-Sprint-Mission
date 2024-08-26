import { useEffect, useState } from "react";
import { getProduct } from "../api/api";
import { useParams } from "react-router-dom";
import styles from "./ItemDetailPage.module.css";
import ItemDetail from "../components/ItemDetail";
import Inquiry from "../components/Inquiry";
import Comments from "../components/Comments";
import Button from "../components/Button";

function ItemDetailPage() {
  const [item, setItem] = useState({});
  const { itemId } = useParams();

  //상품 상세 데이터 요청
  const handleLoad = async (option) => {
    const itemDetail = await getProduct(option);
    setItem(itemDetail);
  };

  useEffect(() => {
    handleLoad(itemId);
  }, [itemId]);

  return (
    <div className={styles["item-detail-page"]}>
      <ItemDetail item={item} />
      <Inquiry />
      <Comments itemId={itemId} />
      <Button />
    </div>
  );
}

export default ItemDetailPage;
