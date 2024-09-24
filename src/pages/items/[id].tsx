// src/pages/items/[id].tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getProductDetail } from "@/api/itemApi";
import ItemProfileSection from "@/components/UI/item/ItemProfileSection";
import ItemCommentSection from "@/components/UI/item/ItemCommentSection";
import BackIcon from "@/images/icons/ic_back.svg";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { Product } from "@/types/product";
import { useRouter } from "next/router";

export default function ItemPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady && id) {
      const fetchProduct = async () => {
        try {
          const productIdNumber = Number(id);
          const productData = await getProductDetail(productIdNumber);
          setProduct(productData);
        } catch (err) {
          console.error(err);
          setError("상품 정보를 불러오는 중 오류가 발생했습니다.");
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [router.isReady, id]);

  if (loading) {
    return <LoadingSpinner isLoading={true} />;
  }

  if (error) {
    alert(`오류: ${error}`);
  }

  if (!product) return <LoadingSpinner isLoading={true} />;

  return (
    <>
      <div className="container mx-auto pt-24 px-4">
        <ItemProfileSection product={product} />

        <hr className="my-6 border-t border-gray-200" />

        <ItemCommentSection productId={product.id} />

        <Link
          href="/items"
          className="flex items-center gap-2 text-lg font-semibold mx-auto mt-8 text-blue-600 hover:text-blue-800"
        >
          목록으로 돌아가기
          <BackIcon className="w-5 h-5" />
        </Link>
      </div>
    </>
  );
}
