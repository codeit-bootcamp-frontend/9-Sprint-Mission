import { useEffect, useState } from "react";
import FileInput from "../FileInput/FileInput";
import styled from "styled-components";
import AddItemDiv from "./AddItemDiv";
import AddItemH2 from "./AddItemH2";
import AddItemButton from "./AddItemButton";
import Label from "./Label";
import {
  FileInputWrap,
  FileInputLabel,
  PlusButton,
  AddText,
  WarnAlarm,
} from "./FileInputWrap";
import { Input } from "./Input";
import { Textarea } from "./TextArea";
import Tag from "./Tag";

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const TagItemsWrap = styled.div`
  display: flex;
`;

const Form = styled.form`
  @media (min-width: 375px) {
    padding: 24px 15px 70px;

    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  @media (min-width: 768px) {
    padding: 16px 24px 78px;
  }

  @media (min-width: 1200px) {
    width: 1200px;
    margin: 0 auto;
    padding: 24px 0 59px;
  }
`;

const AddItemForm = () => {
  const [isNotFilledInput, setIsNotFilledInput] = useState(true);
  const [tagValue, setTagValue] = useState("");
  const [isFile, setIsFile] = useState(false);
  const [values, setValues] = useState({
    imgFile: null,
    productName: "",
    productIntro: "",
    price: "",
    tag: [],
  });

  const handleFileChange = (name, value) => {
    if (values.imgFile && value !== null) {
      setIsFile(true);
      return;
    } else {
      setIsFile(false);
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTagInputChange = (e) => {
    setTagValue(e.target.value);
  };

  const addTag = (e) => {
    if (tagValue !== "" && !values[e.target.name].includes(tagValue)) {
      setValues((prevValues) => ({
        ...prevValues,
        [e.target.name]: [...values[e.target.name], tagValue.trim()],
      }));

      setTagValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(e);
    }
  };

  const handleDeleteTag = (index, name) => {
    const filteredTagValues = values["tag"].filter((value) => {
      return value !== values["tag"][index];
    });
    setValues((prevValues) => ({
      ...prevValues,
      [name]: filteredTagValues,
    }));
  };

  useEffect(() => {
    const { imgFile, ...checkFields } = values;
    const filledInput = Object.values(checkFields).every(
      (value) =>
        value !== "" && (Array.isArray(value) ? value.length > 0 : true)
    );

    filledInput ? setIsNotFilledInput(false) : setIsNotFilledInput(true);

    return () => {
      setIsNotFilledInput(true);
    };
  }, [values]);

  return (
    <Form>
      <AddItemDiv>
        <AddItemH2>상품 등록하기</AddItemH2>
        <AddItemButton disabled={isNotFilledInput}>등록</AddItemButton>
      </AddItemDiv>
      <div>
        <Label>상품 이미지</Label>
        <FileInputWrap>
          <div>
            <FileInputLabel htmlFor="file">
              <PlusButton />
              <AddText>이미지 등록</AddText>
            </FileInputLabel>
            {isFile && (
              <WarnAlarm>*이미지 등록은 최대 1개까지 가능합니다.</WarnAlarm>
            )}
          </div>
          <FileInput
            name="imgFile"
            value={values.imgFile}
            onChange={handleFileChange}
          />
        </FileInputWrap>
      </div>
      <InputWrap>
        <Label htmlFor="productName">상품명</Label>
        <Input
          id="productName"
          name="productName"
          placeholder="상품명을 입력해주세요"
          value={values.productName}
          onChange={handleChange}
        />
      </InputWrap>
      <InputWrap>
        <Label htmlFor="productIntro">상품소개</Label>
        <Textarea
          id="productIntro"
          name="productIntro"
          placeholder="상품 소개를 입력해주세요"
          value={values.productIntro}
          onChange={handleChange}
        />
      </InputWrap>
      <InputWrap>
        <Label htmlFor="price">판매가격</Label>
        <Input
          id="price"
          name="price"
          placeholder="판매 가격을 입력해주세요"
          value={values.price}
          onChange={handleChange}
        />
      </InputWrap>
      <InputWrap>
        <Label htmlFor="tag">태그</Label>
        <Input
          id="tag"
          name="tag"
          placeholder="태그를 입력해주세요"
          value={tagValue}
          onChange={handleTagInputChange}
          onKeyDown={handleKeyDown}
        />
        <TagItemsWrap>
          {values["tag"] &&
            values.tag.map((item, index) => {
              return (
                <Tag
                  key={index}
                  item={item}
                  index={index}
                  handleDeleteTag={handleDeleteTag}
                />
              );
            })}
        </TagItemsWrap>
      </InputWrap>
    </Form>
  );
};

export default AddItemForm;
