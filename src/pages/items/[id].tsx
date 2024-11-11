// src/pages/items/[id].tsx
import React from "react";
import { useRouter } from "next/router";
import ItemDetailSection from "@/components/UI/item/ItemDetailSection";
import ItemCommentSection from "@/components/UI/comment/ItemCommentSection";
import BackToListButton from "@/components/UI/BackToListButton";
import { useProduct } from "@/hooks/useProduct";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

const ItemPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const productId = Number(id);

  const { useProductDetail } = useProduct();
  const { data: productDetail, isLoading, error } = useProductDetail(productId);

  if (isLoading) {
    return <LoadingSpinner isLoading={true} />;
  }

  if (error) {
    alert(`오류: 상품 정보를 불러오는 중 오류가 발생했습니다.`);
  }

  if (!productDetail) {
    return (
      <>
        <div className="container mx-auto pt-24 px-4">상품 정보가 없습니다.</div>
        <BackToListButton path="/items" />
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto pt-24 px-4">
        <ItemDetailSection productDetail={productDetail} />
        <hr className="my-6 border-t border-gray-200" />
        <ItemCommentSection productId={productDetail.id} />
      </div>
      <BackToListButton path="/items" />
    </>
  );
};

export default ItemPage;
