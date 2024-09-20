import React, { useState } from "react";

import "./AddItem.css";
import { FieldErrors, useFormContext, UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { AdditemConstants } from "./AdditemConstants";

type FormValues = z.infer<typeof AdditemConstants>;

interface IProps {
  formValues: FormValues;
  setValue: UseFormSetValue<FormValues>,
  error: FieldErrors<FormValues>;
}

interface INewTag {
  tag: string | number
}

const AddItemForm = ({ formValues, setValue, error }: IProps) => {
  const [tagInput, setTagInput] = useState("");
  const { register } = useFormContext();
  
  // 입력한 태그명 변경함수
  const onChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTag = e.target.value;
    setTagInput(newTag);
  };

  // 태그 입력하여 엔터눌렀을 때 실행함수
  const onTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();

      const newTag: INewTag = {
        tag: tagInput.trim(),
      };

      if (formValues.tags?.some((tag) => tag.tag === newTag.tag)) {
        setTagInput("");
        return;
      }

      const newValues = [...(formValues.tags || []), newTag];
      
      setValue("tags", newValues);
      setTagInput("");
    }
  };

  // 추가한 태그 삭제함수
  const onDeleteTag = (clickTag: string | number) => {
    setValue("tags", formValues.tags?.filter((tag) => tag.tag !== clickTag));
  };

  return (
    <>
      <div className="addItemContentsBox">
        <label htmlFor="itemName" className="contentsTitle">
          상품명
        </label>
        <input
          {...register("name")}
          type="text"
          id="itemName"
          name="name"
          className="contents"
          placeholder="상품명을 입력해주세요."
        />
        {error && <span className="errorMsg">{error.name?.message}</span>}
      </div>
      <div className="addItemContentsBox">
        <label htmlFor="itemDescription" className="contentsTitle">
          상품 소개
        </label>
        <textarea
          {...register("description")}
          id="itemDescription"
          name="description"
          rows={10}
          className="itemDescription"
          placeholder="상품 소개를 입력해주세요."
        />
        {error && <span className="errorMsg">{error.description?.message}</span>}
      </div>
      <div className="addItemContentsBox">
        <label htmlFor="itemPrice" className="contentsTitle">
          판매 가격
        </label>
        <input
          {...register("price")}
          type="number"
          id="itemPrice"
          name="price"
          className="contents"
          placeholder="판매 가격을 입력해주세요."
        />
        {error && <span className="errorMsg">{error.price?.message}</span>}
      </div>
      <div className="addItemContentsBox">
        <label htmlFor="itemTag" className="contentsTitle">
          태그
        </label>
        <input
          {...register("tags")}
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
          {formValues.tags?.map((tag) => (
            <li key={tag.tag} className="tagListItem">
              {tag.tag}
              <button className="tagDeleteBtn" onClick={() => onDeleteTag(tag.tag)}>
                <img src="/icons/delete.png" alt="삭제" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AddItemForm;
