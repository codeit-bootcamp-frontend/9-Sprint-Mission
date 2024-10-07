// src/pages/addItem/index.tsx
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import InputItem from "@/components/UI/InputItem";
import TagInput from "@/components/UI/TagInput";
import ImageUpload from "@/components/UI/ImageUpload";
import ConfirmModal from "@/components/UI/modal/ConfirmModal";
import AlertModal from "@/components/UI/modal/AlertModal";
import { addProduct } from "@/api/product";
import { ProductForm } from "@/types/product";
import { getCookie } from "@/utils/cookie";

export default function AddItemPage() {
  const [name, setName] = useState(""); // 상품명 상태
  const [description, setDescription] = useState(""); // 상품 설명 상태
  const [price, setPrice] = useState(""); // 상품 가격 상태 (문자열로 입력받고, 숫자로 변환)
  const [tags, setTags] = useState<string[]>([]); // 태그 상태
  const [imageUrls, setImageUrls] = useState<string[]>([]); // 이미지 URL 배열 상태
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false); // 로그인 유도 모달 상태
  const [isAlertModalOpen, setAlertModalOpen] = useState(false); // 제출 경고 모달 상태
  const [accessToken, setAccessToken] = useState<string | null>(null); // accessToken 상태

  const router = useRouter();

  // 쿠키에서 accessToken을 가져와 로그인 상태를 설정
  useEffect(() => {
    const token = getCookie("accessToken");
    if (token) {
      setAccessToken(token);
    } else {
      setConfirmModalOpen(true); // 토큰이 없으면 로그인 유도 모달 표시
    }
  }, []);

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
    if (!accessToken) {
      setAlertModalOpen(true); // 로그인하지 않은 경우 경고 모달을 띄움
      return;
    }

    // 가격을 숫자로 변환
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      alert("가격은 숫자로 입력해야 합니다.");
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
      const newItem = await addProduct(itemForm, accessToken);

      // 등록 성공 시 해당 상품 페이지로 이동
      router.push(`/items/${newItem.id}`);
    } catch (error) {
      console.error("상품 등록 실패:", error);
      alert("상품 등록 중 오류가 발생했습니다."); // 사용자에게 에러 알림
    }
  };

  // 로그인 유도 모달에서 '확인'을 눌렀을 때 로그인 페이지로 이동
  const handleConfirmModalConfirm = () => {
    router.push("/auth/login");
  };

  // 로그인 유도 모달에서 '취소'를 눌렀을 때 모달 닫기
  const handleConfirmModalCancel = () => {
    setConfirmModalOpen(false);
  };

  // 경고 모달 닫기
  const handleAlertModalClose = () => {
    setAlertModalOpen(false);
  };

  // 이미지 업로드 후 이미지 URL 배열 상태를 업데이트
  const handleImageUpload = (uploadedImageUrl: string | null) => {
    if (uploadedImageUrl) {
      setImageUrls((prev) => [...prev, uploadedImageUrl]);
    }
  };

  return (
    <div className="container mx-auto mt-20 px-4">
      {/* 로그인하지 않은 경우 접근 시 모달 표시 */}
      {isConfirmModalOpen && (
        <ConfirmModal
          message="로그인한 사용자만 상품 등록이 가능합니다.<br />로그인 페이지로 이동하겠습니까?"
          onConfirm={handleConfirmModalConfirm}
          onCancel={handleConfirmModalCancel}
        />
      )}

      {/* 제출 시 로그인하지 않은 경우 경고 모달 표시 */}
      {isAlertModalOpen && (
        <AlertModal
          message="로그인한 사용자만 상품을 등록할 수 있습니다!"
          onClose={handleAlertModalClose}
        />
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
