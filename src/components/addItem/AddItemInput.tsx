import React, { useState } from "react";
import { IValues } from "./AddItem";
import "./AddItem.css";

interface IProps {
  values: IValues;
  setValues: React.Dispatch<React.SetStateAction<IValues>>;
}

const AddItemInput: React.FC<IProps> = ({ values, setValues }) => {

  const [tagInput, setTagInput] = useState("");

  // 상품명, 설명, 가격 변경 및 검증함수
  const onChangeContents = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = e;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // 입력한 태그명 변경함수
  const onChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTag = e.target.value;
    setTagInput(newTag);
  };

  // 태그 입력하여 엔터눌렀을 때 실행함수
  const onTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();

      const newTag = {
        name: tagInput.trim(),
      };

      if (values.tags.some((tag) => tag.name === newTag.name)) {
        setTagInput("");
        return;
      }

      const newValues = {
        ...values,
        tags: [...values.tags, newTag],
      };

      setValues(newValues);
      setTagInput("");
    }
  };

  // 추가한 태그 삭제함수
  const onDeleteTag = (clickTag: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      tags: prevValues.tags.filter((tag) => tag.name !== clickTag),
    }));
  };

  return (
    <>
      <div className="addItemContentsBox">
        <label htmlFor="itemName" className="contentsTitle">
          상품명
        </label>
        <input
          type="text"
          onChange={onChangeContents("name")}
          value={values.name}
          id="itemName"
          name="name"
          className="contents"
          placeholder="상품명을 입력해주세요."
          required
        />
      </div>
      <div className="addItemContentsBox">
        <label htmlFor="itemDescription" className="contentsTitle">
          상품 소개
        </label>
        <textarea
          id="itemDescription"
          onChange={onChangeContents("description")}
          value={values.description}
          name="description"
          rows={10}
          className="itemDescription"
          placeholder="상품 소개를 입력해주세요."
          required
        />
      </div>
      <div className="addItemContentsBox">
        <label htmlFor="itemPrice" className="contentsTitle">
          판매 가격
        </label>
        <input
          type="number"
          id="itemPrice"
          onChange={onChangeContents("price")}
          value={values.price.toLocaleString("ko-KR")}
          name="price"
          className="contents"
          placeholder="판매 가격을 입력해주세요."
          required
        />
      </div>
      <div className="addItemContentsBox">
        <label htmlFor="itemTag" className="contentsTitle">
          태그
        </label>
        <input
          type="text"
          id="itemTag"
          onChange={onChangeTag}
          onKeyDown={onTagKeyDown}
          value={tagInput}
          name="itemTag"
          className="contents"
          placeholder="태그를 입력해주세요."
        />
        <ul className="tagList">
          {values.tags.map((tag) => (
            <li key={tag.name} className="tagListItem">
              {tag.name}
              <button className="tagDeleteBtn" onClick={() => onDeleteTag(tag.id!)}>
                <img src="/delete.png" alt="삭제" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AddItemInput;
