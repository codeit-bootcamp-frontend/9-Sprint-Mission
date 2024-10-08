// src/pages/addItem/index.tsx
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import InputItem from "@/components/UI/InputItem";
import TagInput from "@/components/UI/TagInput";
import ImageUpload from "@/components/UI/ImageUpload";
import AlertModal from "@/components/UI/modal/AlertModal";
import { addProduct } from "@/api/products/addProduct";
import { ProductForm } from "@/types/product";
import { useAtom } from "jotai";
import { userAtom } from "@/store/authAtoms";

export default function AddItemPage() {
  const [name, setName] = useState(""); // 상품명 상태
  const [description, setDescription] = useState(""); // 상품 설명 상태
  const [price, setPrice] = useState(""); // 상품 가격 상태 (문자열로 입력받고, 숫자로 변환)
  const [tags, setTags] = useState<string[]>([]); // 태그 상태
  const [imageUrls, setImageUrls] = useState<string[]>([]); // 이미지 URL 배열 상태
  const [isAlertOpen, setIsAlertOpen] = useState(false); // AlertModal 상태
  const [alertMessage, setAlertMessage] = useState(""); // AlertModal 메시지 상태
  const [user] = useAtom(userAtom);

  const router = useRouter();

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // 상품명, 설명, 가격, 태그가 없으면 제출 버튼을 비활성화
  const isSubmitDisabled = !name || !description || !price || !tags.length;

  // 상품 등록 핸들러
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      setAlertMessage("로그인이 필요합니다.");
      setIsAlertOpen(true); // 로그인하지 않은 경우 경고 모달을 띄움
      return;
    }

    // 가격을 숫자로 변환
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      setAlertMessage("가격은 숫자로 입력해야 합니다.");
      setIsAlertOpen(true);
      return;
    }

    // 이미지가 없는 경우 NoImage 넣음
    const finalImageUrls =
      imageUrls.length === 0 ? ["/images/ui/no-image.png"] : imageUrls;

    const itemForm: ProductForm = {
      name,
      description,
      price: numericPrice, // 숫자로 변환된 가격
      tags,
      images: finalImageUrls, // 이미지 배열
    };

    try {
      // API를 호출하여 상품 등록
      const newItem = await addProduct(itemForm);
      if (newItem) {
        // 등록 성공 시 해당 상품 페이지로 이동
        router.push(`/items/${newItem.id}`);
      } else {
        console.error("상품 등록 실패:", newItem);
        setAlertMessage("상품 등록 실패");
        setIsAlertOpen(true);
      }
    } catch (error) {
      console.error("상품 등록 실패:", error);
      alert("상품 등록 중 오류가 발생했습니다."); // 사용자에게 에러 알림
    }
  };

  // 경고 모달 닫기
  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  // 이미지 업로드 후 이미지 URL 배열 상태를 업데이트
  const handleImageUpload = (uploadedImageUrl: string | null) => {
    if (uploadedImageUrl) {
      setImageUrls((prev) => [...prev, uploadedImageUrl]);
    }
  };

  return (
    <div className="container mx-auto mt-20 px-4">
      {/* 제출 시 로그인하지 않은 경우 경고 모달 표시 */}
      {isAlertOpen && (
        <AlertModal message={alertMessage} onClose={handleCloseAlert} />
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold">상품 등록하기</div>
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            등록
          </button>
        </div>

        <div className="space-y-6">
          {/* 상품 이미지 업로드 컴포넌트 */}
          <ImageUpload title="상품 이미지" onImageUpload={handleImageUpload} />

          {/* 상품명 입력 */}
          <InputItem
            id="name"
            label="상품명"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="상품명을 입력해 주세요"
          />

          {/* 상품 설명 입력 */}
          <InputItem
            id="description"
            label="상품 소개"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="상품 소개를 입력해 주세요"
            isTextArea
          />

          {/* 상품 가격 입력 */}
          <InputItem
            id="price"
            label="판매 가격"
            type="number"
            min={1000}
            max={100000000}
            step={1000} // 1000단위로 값 입력 가능
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="판매 가격을 입력해 주세요"
          />

          {/* 태그 입력 */}
          <TagInput tags={tags} onAddTag={addTag} onRemoveTag={removeTag} />
        </div>
      </form>
    </div>
  );
}
