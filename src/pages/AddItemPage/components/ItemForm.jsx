import styled from "styled-components";
import Tag from "./Tag";
import ContentInput from "./ContentInput";

function ItemForm({
  values,
  handleChange,
  handleInputChange,
  handleTagChange,
  onSubmit,
}) {
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

      <ItemFormMainTitle>상품이미지</ItemFormMainTitle>
      <ContentInput
        category="image"
        title="상품이미지"
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
      />

      <ItemFormMainTitle>상품명</ItemFormMainTitle>
      <ItemFormMainInput
        category="title"
        title="상품명"
        name="title"
        placeholder="상품명을 입력해주세요"
        value={values.title}
        onChange={handleInputChange}
      />

      <ItemFormMainTitle htmlFor="content">상품 소개</ItemFormMainTitle>
      <ItemFormMainTextarea
        name="content"
        placeholder="상품 소개를 입력해주세요"
        value={values.content}
        onChange={handleInputChange}
      />

      <ItemFormMainTitle htmlFor="price">판매가격</ItemFormMainTitle>
      <ItemFormMainInput
        category="price"
        title="판매가격"
        name="price"
        placeholder="판매 가격을 입력해주세요"
        value={values.price}
        onChange={handleInputChange}
      />

      <ItemFormMainTitle htmlFor="tags">태그</ItemFormMainTitle>
      <TagMainInput>
        <Tag name="tags" values={values.tags} onChange={handleTagChange} />
      </TagMainInput>
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
  cursor: pointer;
  background-color: ${(props) => (props.disabled ? "#9ca3af" : "#3692ff")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
