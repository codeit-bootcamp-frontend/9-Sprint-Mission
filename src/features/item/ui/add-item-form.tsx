import { useState, useRef } from "react";
import styled from "styled-components";
import addProducts from "../api/add-products";
import ImageUpload from "../../../shared/ui/image-upload";
import InputWithLabel from "../../../shared/ui/input-with-label";
import TextareaWithLabel from "../../../shared/ui/textarea-with-label";
import { ReactComponent as DeleteImage } from "../../../shared/assets/images/icons/ic_delete.svg";
import { AddItemForm as AddItemFormType } from "../types/add-item-form";

// Styled Components
const AddItemContainer = styled.form`
  width: 346px;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 696px;
  }

  @media (min-width: 1200px) {
    width: 1200px;
    padding: 15px;
  }
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ItemTitle = styled.div`
  font-size: 20px;
  line-height: 32px;
  color: var(--gray-800);
  font-weight: 700;
  margin-top: 5px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }

  @media (min-width: 1200px) {
    margin-bottom: 15px;
  }
`;

const ImageErrorMessage = styled.div`
  color: var(--red);
  margin-top: 8px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const TagItem = styled.span`
  display: inline-flex;
  align-items: center;
  background-color: var(--gray-100);
  border-radius: 26px;
  padding: 6px 12px;
  gap: 10px;
`;

const RemoveTagButton = styled.button`
  background-color: var(--gray-400);
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  cursor: pointer;
  font-size: 14px;
  line-height: 14px;
  padding: 0;
`;

const SubmitButton = styled.button<{ disabled: boolean }>`
  width: auto;
  padding: 12px 23px;
  background-color: ${(props) =>
    props.disabled ? "var(--gray-400)" : "var(--blue-100)"};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 16px;
  margin-top: 20px;
`;

// 추가된 Styled Component for Tags Container
const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

// Component
const AddItemForm = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string>("");

  const clearFileInputRef = useRef<() => void>(() => {});

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPrice(Number(e.target.value));
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTagInput(e.target.value);

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagRemove = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleImageUpload = (uploadedImage: string) => {
    if (image) {
      setImageError("*이미지 등록은 최대 1개까지 가능합니다.");
    } else {
      setImage(uploadedImage);
      setImageError("");
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    setImageError("");
    if (clearFileInputRef.current) {
      clearFileInputRef.current();
    }
  };

  const isFormValid: boolean =
    Boolean(name) && Boolean(description) && price > 0 && tags.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    const formData: AddItemFormType = {
      name: name,
      description: description,
      price: price,
      tags: tags,
      images: image ? [image] : [],
    };

    console.log(formData);

    const responseInfo = await addProducts(formData);
    if (responseInfo) {
      console.log("상품 등록 성공", responseInfo);
    } else {
      console.error("상품 등록 실패");
    }
  };

  return (
    <AddItemContainer onSubmit={handleSubmit}>
      <ItemHeader>
        <ItemTitle>상품 등록하기</ItemTitle>
        <SubmitButton type="submit" disabled={!isFormValid}>
          등록
        </SubmitButton>
      </ItemHeader>

      <FormGroup>
        <label htmlFor="imageUpload">상품 이미지</label>
        <br />
        <ImageUpload
          id="imageUpload"
          name="imageUpload"
          image={image}
          setImage={handleImageUpload}
          onRemoveImage={handleImageRemove}
        />
        {imageError && <ImageErrorMessage>{imageError}</ImageErrorMessage>}
      </FormGroup>

      <InputWithLabel
        id="name"
        label="상품명"
        value={name}
        onChange={handleNameChange}
        placeholder="상품명을 입력해주세요"
      />

      <TextareaWithLabel
        id="description"
        label="상품 소개"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="상품 소개를 입력해주세요"
      />

      <InputWithLabel
        id="price"
        label="판매가격"
        type="number"
        value={price}
        onChange={handlePriceChange}
        placeholder="판매 가격을 입력해주세요"
      />

      <FormGroup>
        <label htmlFor="tags">태그</label>
        <br />
        <input
          type="text"
          id="tags"
          value={tagInput}
          onChange={handleTagInputChange}
          onKeyDown={handleTagKeyDown}
          placeholder="태그를 입력 후 Enter를 눌러주세요"
        />
      </FormGroup>

      {/* 추가된 TagsContainer 컴포넌트 */}
      <TagsContainer>
        {tags.map((tag, index) => (
          <TagItem key={index}>
            #{tag}
            <RemoveTagButton onClick={() => handleTagRemove(index)}>
              <DeleteImage />
            </RemoveTagButton>
          </TagItem>
        ))}
      </TagsContainer>
    </AddItemContainer>
  );
};

export default AddItemForm;
