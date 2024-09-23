import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import styled from "styled-components";
import FileInput from "./FileInput";
import Tag from "./Tag";
import { Values } from "../../Types/Types";

const INITIAL_VALUES: Values = {
  images: null,
  name: "",
  price: 0,
  description: "",
  tags: [],
};

const AdditemForm = ({ initialValues = INITIAL_VALUES }) => {
  const [value, setValue] = useState(initialValues);
  const [tagValue, setTagValue] = useState("");
  const { name, price, description, tags } = value;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 새 폼 데이터 인스턴스 생성
    const formData = new FormData();
    // 각 필드의 값을 지정(key, value)
    if (value.images) {
      formData.append("images", value.images);
    }
    formData.append("name", value.name);
    formData.append("price", JSON.stringify(value.price));
    formData.append("description", value.description);
    formData.append("tags", JSON.stringify(value.tags));

    // 성공적으로 추가된 후 초기화
    setValue(INITIAL_VALUES);
  };

  // 폼 필드 변경 처리 => name: 필드의 이름, value: 새로운 값
  const handleChange = (name: string, value: File | string | null) => {
    // 기존의 상태를 복사하고, 지정된 name에 해당하는 값을 새로 전달된 value로 업데이트
    setValue((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // 입력 필드 값 변경 처리 함수
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  // 태그 추가 함수
  const addTag = (tag: string) => {
    // 빈칸 X, 중복 X
    if (tag && tag.trim() !== "" && !value.tags.includes(tag)) {
      setValue((prevValue) => ({
        ...prevValue,
        tags: [...prevValue.tags, tag],
      }));
      setTagValue("");
    }
  };

  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTagValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(tagValue);
    }
  };

  const handleTagDelete = (tagDelete: string) => {
    setValue((prevValue) => ({
      ...prevValue,
      tags: prevValue.tags.filter((tag) => tag !== tagDelete),
    }));
  };

  return (
    <form className="AdditemForm" onSubmit={handleSubmit}>
      <div className="AdditemForm-submit-wrap">
        <h2 className="AdditemForm-main-tit">상품 등록하기</h2>
        <Button
          type="submit"
          disabled={!name || !(price > 0) || !description || !tags[0]}
        >
          등록
        </Button>
      </div>
      <FileInput name="images" value={value.images} onChange={handleChange} />
      <div className="AdditemForm-input-wrap">
        <label htmlFor="name" className="AdditemForm-sub-tit">
          상품명
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={value.name}
          placeholder="상품명을 입력해주세요"
          onChange={handleInputChange}
        />
      </div>
      <div className="AdditemForm-input-wrap">
        <label htmlFor="description" className="AdditemForm-sub-tit">
          상품 소개
        </label>
        <textarea
          id="description"
          name="description"
          value={value.description}
          placeholder="상품 소개를 입력해주세요"
          className="AdditemForm-content"
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="AdditemForm-input-wrap">
        <label htmlFor="price" className="AdditemForm-sub-tit">
          판매가격
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={value.price}
          placeholder="판매 가격을 입력해주세요"
          onChange={handleInputChange}
        />
      </div>
      <div className="AdditemForm-input-wrap">
        <label htmlFor="tags" className="AdditemForm-sub-tit">
          태그
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={tagValue || ""}
          placeholder="태그를 입력해주세요"
          onChange={handleTagChange}
          onKeyDown={handleKeyDown}
        />
        <Tag tags={value.tags} handleTagDelete={handleTagDelete} />
      </div>
    </form>
  );
};

export default AdditemForm;

export const Button = styled.button`
  font-size: 1.6rem;
  font-weight: 600;
  color: #f3f4f6;
  background-color: ${({ disabled }) => (disabled ? `#9CA3AF` : `#3692FF`)};
  border-radius: 8px;
  padding: 12px 32px;
`;
