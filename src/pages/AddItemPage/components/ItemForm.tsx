import styled from "styled-components";
import Tag from "./Tag";
import ContentInput from "./ContentInput";
import { ChangeEvent, FormEvent } from "react";
import { ItemFormValues } from "../../../types/types";

interface ItemFormProps {
  values: ItemFormValues;
  handleFileChange: (name: string, file: File | null) => void;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  handleTagChange: (updatedItems: { id: number; value: string }[]) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

function ItemForm({
  values,
  handleFileChange,
  handleInputChange,

  handleTagChange,
  onSubmit,
}: ItemFormProps) {
  const isFormValid = () => {
    return (
      values.title !== "" &&
      values.content !== "" &&
      values.price !== "" &&
      values.tags.length !== 0
    );
  };

  return (
    <ItemFormMain onSubmit={onSubmit}>
      <AddItemBar>
        <AddItemBarTitle>상품 등록하기</AddItemBarTitle>
        <AddItemBarButton type="submit" disabled={!isFormValid()}>
          등록
        </AddItemBarButton>
      </AddItemBar>

      <ItemFormSection title="상품이미지">
        <ContentInput
          title="상품이미지"
          name="imgFile"
          value={values.imgFile}
          onChange={handleFileChange}
        />
      </ItemFormSection>

      <ItemFormSection title="상품명">
        <ItemFormMainInput
          name="title"
          placeholder="상품명을 입력해주세요"
          value={values.title}
          onChange={handleInputChange}
        />
      </ItemFormSection>

      <ItemFormSection title="상품 소개">
        <ItemFormMainTextarea
          name="content"
          placeholder="상품 소개를 입력해주세요"
          value={values.content}
          onChange={handleInputChange}
        />
      </ItemFormSection>

      <ItemFormSection title="판매가격">
        <ItemFormMainInput
          name="price"
          placeholder="판매 가격을 입력해주세요"
          value={values.price}
          onChange={handleInputChange}
        />
      </ItemFormSection>

      <ItemFormSection title="태그">
        <TagMainInput>
          <Tag name="tags" values={values.tags} onChange={handleTagChange} />
        </TagMainInput>
      </ItemFormSection>
    </ItemFormMain>
  );
}

export default ItemForm;

const ItemFormMain = styled.form`
  display: flex;
  flex-direction: column;
  padding-bottom: 59px;

  @media (max-width: 1200px) {
    padding-bottom: 78px;
  }

  @media (max-width: 768px) {
    padding-bottom: 70px;
  }
`;

const ItemFormMainTitle = styled.label`
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
`;

const ItemFormMainInput = styled.input`
  padding: 16px 24px;
  background-color: #f3f4f6;
  border: 0;
  border-radius: 12px;
  margin-bottom: 32px;
  font-size: 16px;
  font-weight: 400;
  color: #000;
  height: 56px;

  &::placeholder {
    color: #9ca3af;
  }
`;

const ItemFormMainTextarea = styled.textarea`
  padding: 16px 24px;
  background-color: #f3f4f6;
  border: 0;
  border-radius: 12px;
  margin-bottom: 32px;
  font-size: 16px;
  font-weight: 400;
  color: #000;
  height: 282px;
  resize: none;

  &::placeholder {
    color: #9ca3af;
  }
`;

const TagMainInput = styled.div`
  margin: 0;
`;

const AddItemBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0 24px;
`;

const AddItemBarTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const AddItemBarButton = styled.button`
  width: 74px;
  height: 42px;
  padding: 12px 0;
  border: 0;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #f3f4f6;
  background-color: ${(props) => (props.disabled ? "#9ca3af" : "#3692ff")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

// 추가된 ItemFormSection 컴포넌트
const ItemFormSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <>
    <ItemFormMainTitle>{title}</ItemFormMainTitle>
    {children}
  </>
);
