import Button from "@/components/UI/Button/Button";
import ImageUpload from "@/components/UI/ImageUpload";
import InputItem from "@/components/UI/InputItem";
import { TitleSection, SectionTitle } from "@/components/UI/CommonStyles";
import { FormEvent, useState } from "react";

const Addboard = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // form 제출 버튼 활성화 조건: 이미지 제외 모든 input에 값이 입력되어야 함
  const isSubmitDisabled = !name || !description;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          marginBottom: "8rem",
        }}
      >
        <TitleSection>
          <SectionTitle>게시글</SectionTitle>
          <Button type="submit" disabled={isSubmitDisabled}>
            등록
          </Button>
        </TitleSection>

        <InputItem
          label="* 제목"
          id="title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="제목을 입력해주세요"
          type="text"
        />
        <InputItem
          label="* 내용"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="내용을 입력해주세요"
          type="text"
          isTextArea
        />
        <ImageUpload title="이미지" />
      </form>
    </div>
  );
};

export default Addboard;
