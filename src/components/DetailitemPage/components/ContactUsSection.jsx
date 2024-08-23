import { useState, useEffect } from "react";
import { postPandaMarket } from "../../../api";
import { Title } from "../Detailitem";
import { Button } from "../../AdditemPage/components/AdditemForm";
import styled from "styled-components";
import ContactUs from "./ContactUs";
import { useParams } from "react-router-dom";

const Textarea = styled.textarea`
  font-family: Pretendard;
  background-color: ${(props) => props.theme.gray100};
  color: ${(props) => props.theme.gray800};
  border: none;
  border-radius: 12px;
  font-size: 1.6rem;
  padding: 20px;
  width: 100%;
  min-height: 104px;
  resize: vertical;
  box-sizing: border-box;
  margin-top: 1rem;

  &::placeholder {
    color: ${(props) => props.theme.gray400};
  }

  &:focus {
    outline: none;
  }
`;

const ContactUsSection = () => {
  const [inputList, setInputList] = useState([]);
  const [title, setTitle] = useState();

  const onSubmit = async (newTitle) => {
    // const newTitle = await postPandaMarket(id);
    setInputList([...inputList, newTitle]);
  };

  console.log(inputList);

  const onDelete = (id) => {
    setInputList(inputList.filter((title) => Number(title.id) !== Number(id)));
  };

  const onUpdate = (id) => {
    setInputList(
      inputList.map((title) =>
        Number(title.id) === Number(id) ? [...title] : title,
      ),
    );
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      onSubmit(title);
      setTitle("");
    }
  };

  return (
    <section className="ContactUsSection">
      <Title>문의하기</Title>
      <Textarea
        name="content"
        value={title}
        onChange={handleChange}
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
      />
      <Button onClick={handleSubmit}>등록</Button>

      {inputList.map((title) => (
        <ContactUs
          key={title}
          content={title}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
};

export default ContactUsSection;
