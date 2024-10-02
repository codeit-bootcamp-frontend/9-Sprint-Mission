// src/pages/addItem/index.tsx
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { loginAtom } from "@/store/authAtoms";
import InputItem from "@/components/UI/InputItem";
import TagInput from "@/components/UI/TagInput";
import ImageUpload from "@/components/UI/ImageUpload";
import ConfirmModal from "@/components/UI/modal/ConfirmModal";
import AlertModal from "@/components/UI/modal/AlertModal";

export default function AddItemPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false); // 접근할 때 모달 상태
  const [isAlertModalOpen, setAlertModalOpen] = useState(false); // 제출 시 모달 상태
  const [isLoggedIn] = useAtom(loginAtom); // 로그인 여부 확인

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      // 로그인하지 않은 경우 Login 페이지 이동 유도 모달을 띄움(닫으면 폼 입력 가능하나 제출시 경고 모달을 띄움)
      setConfirmModalOpen(true);
    }
  }, [isLoggedIn]);

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const isSubmitDisabled = !name || !description || !price || !tags.length;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      // 로그인하지 않은 경우 경고 모달을 띄움
      setAlertModalOpen(true);
      return;
    }
    // TODO: 제출 시 로직 추가
  };

  const handleConfirmModalConfirm = () => {
    // 확인 버튼을 눌렀을 때 로그인 페이지로 리다이렉트
    router.push("/auth/login");
  };

  const handleConfirmModalCancel = () => {
    // 아니오 버튼을 눌렀을 때 모달을 닫음
    setConfirmModalOpen(false);
  };

  const handleAlertModalClose = () => {
    // 경고 모달 닫기
    setAlertModalOpen(false);
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

      {/* 제출 시 로그인 안 된 경우 경고 모달 표시 */}
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
          <ImageUpload title="상품 이미지" />

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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="판매 가격을 입력해 주세요"
          />

          <TagInput tags={tags} onAddTag={addTag} onRemoveTag={removeTag} />
        </div>
      </form>
    </div>
  );
}
