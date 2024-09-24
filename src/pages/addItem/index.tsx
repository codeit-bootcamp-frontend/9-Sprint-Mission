import { FormEvent, useState } from "react";
import InputItem from "@/components/UI/InputItem";
import TagInput from "@/components/UI/TagInput";
import ImageUpload from "@/components/UI/ImageUpload";

export default function AddItemPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState<string[]>([]);

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
    // TODO: 제출 시 로직 추가
  };

  return (
    <div className="container mx-auto px-4">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">상품 등록하기</h1>
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
