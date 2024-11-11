// src/pages/addItem/index.tsx
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import InputItem from "@/components/UI/InputItem";
import TagInput from "@/components/UI/TagInput";
import ImageUpload from "@/components/UI/ImageUpload";
import AlertModal from "@/components/UI/modal/AlertModal";
import { ProductForm } from "@/types/product";
import { useAtom } from "jotai";
import { userAtom } from "@/store/authAtoms";
import { useProduct } from "@/hooks/useProduct";

export default function AddItemPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [user] = useAtom(userAtom);
  const router = useRouter();

  const { addProduct, isLoading } = useProduct();

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const isSubmitDisabled = !name || !description || !price || !tags.length || isLoading.add;

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

    const finalImageUrls = imageUrls.length === 0 ? ["/images/ui/no-image.png"] : imageUrls;

    const itemForm: ProductForm = {
      name,
      description,
      price: numericPrice,
      tags,
      images: finalImageUrls,
    };

    try {
      const { product } = await addProduct(itemForm);
      if (product) {
        router.push(`/items/${product.id}`);
      }
    } catch (error) {
      console.error("상품 등록 실패:", error);
      setAlertMessage("상품 등록 중 오류가 발생했습니다.");
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
          <div className="text-2xl font-bold">상품 등록하기</div>
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading.add ? "등록 중..." : "등록"}
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
}
