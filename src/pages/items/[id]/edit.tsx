import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import InputItem from "@/components/UI/InputItem";
import TagInput from "@/components/UI/TagInput";
import ImageUpload from "@/components/UI/ImageUpload";
import AlertModal from "@/components/UI/modal/AlertModal";
import { useAtom } from "jotai";
import { userAtom } from "@/store/authAtoms";
import { useProduct } from "@/hooks/useProduct";

const EditProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const productId = Number(id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [user] = useAtom(userAtom);

  const { useProductDetail, updateProduct, isLoading } = useProduct();
  const { data: productDetail } = useProductDetail(productId);

  // 권한 체크
  useEffect(() => {
    if (productDetail && user && productDetail.ownerId !== user.id) {
      setAlertMessage("수정 권한이 없습니다.");
      setIsAlertOpen(true);
      router.push(`/items/${productId}`);
    }
  }, [productDetail, user, productId, router]);

  // 상품 정보가 로드되면 폼 값 설정
  useEffect(() => {
    if (productDetail) {
      setName(productDetail.name);
      setDescription(productDetail.description);
      setPrice(productDetail.price.toString());
      setTags(productDetail.tags);
      setImageUrls(productDetail.images.length ? productDetail.images : []);
    }
  }, [productDetail]);

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const isSubmitDisabled = !name || !description || !price || !tags.length || isLoading.update;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      setAlertMessage("로그인이 필요합니다.");
      setIsAlertOpen(true);
      return;
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      setAlertMessage("가격은 숫자로 입력해야 합니다.");
      setIsAlertOpen(true);
      return;
    }

    const productForm = {
      name,
      description,
      price: numericPrice,
      tags,
      images: imageUrls,
    };

    try {
      await updateProduct({ productId, productForm });
      router.push(`/items/${productId}`);
    } catch (error) {
      console.error("상품 수정 실패:", error);
      setAlertMessage("상품 수정 중 오류가 발생했습니다.");
      setIsAlertOpen(true);
    }
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const handleImageUpload = (uploadedImageUrl: string | null) => {
    if (uploadedImageUrl) {
      setImageUrls((prev) => [...prev, uploadedImageUrl]);
    }
  };

  return (
    <div className="container mx-auto mt-20 px-4">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold">상품 수정하기</div>
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading.update ? "수정 중..." : "수정"}
          </button>
        </div>

        <div className="space-y-6">
          <ImageUpload title="상품 이미지" onImageUpload={handleImageUpload} />

          <InputItem
            id="name"
            label="상품명"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="상품명을 입력해 주세요"
          />

          <InputItem
            id="description"
            label="상품 소개"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="상품 소개를 입력해 주세요"
            isTextArea
          />

          <InputItem
            id="price"
            label="판매 가격"
            type="number"
            min={1000}
            max={100000000}
            step={1000}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="판매 가격을 입력해 주세요"
          />

          <TagInput tags={tags} onAddTag={addTag} onRemoveTag={removeTag} />
        </div>
      </form>

      <AlertModal isOpen={isAlertOpen} message={alertMessage} onClose={handleCloseAlert} />
    </div>
  );
};

export default EditProductPage;
