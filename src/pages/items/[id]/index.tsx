// src/pages/items/[id].tsx
import React from "react";
import { useRouter } from "next/router";
import ItemDetailSection from "@/components/UI/item/ItemDetailSection";
import ItemCommentSection from "@/components/UI/comment/ItemCommentSection";
import BackToListButton from "@/components/UI/BackToListButton";

const ItemPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const productId = Number(id);

  if (!productId) {
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
        <ItemDetailSection productId={productId} />
        <hr className="my-6 border-t border-gray-200" />
        <ItemCommentSection productId={productId} />
      </div>
      <BackToListButton path="/items" />
    </>
  );
};

export default ItemPage;
