// 게시글 작성 페이지
import { ChangeEvent, useState } from "react";
import { Button } from "@/styles/CommonStyles";
import FileInput from "@/components/UI/Input/FileInput";
import styled from "styled-components";

export default function AddBoard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const contentIsEmpty = !(title && content);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <Container>
      <Header>
        <Title>게시글 쓰기</Title>
        <SubmitButton disabled={contentIsEmpty}>등록</SubmitButton>
      </Header>
      <TitleSection>
        <Title>*제목</Title>
        <ContentInput
          name="title"
          value={title}
          type="text"
          onChange={handleTitleChange}
          placeholder="제목을 입력해주세요."
        />
      </TitleSection>
      <ContentSection>
        <Title>*내용</Title>
        <ContentTextArea
          name="content"
          value={content}
          onChange={handleContentChange}
          placeholder="내용을 입력해주세요."
        />
      </ContentSection>
      <ImageSection>
        <Title>이미지</Title>
        <FileInput />
      </ImageSection>
    </Container>
  );
}

// 스타일 컴포넌트
const Container = styled.div`
  max-width: 1200px;
  margin: 90px auto;
  padding: 0 100px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  &:first-child {
    font-size: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SubmitButton = styled(Button)``;

const TitleSection = styled.div`
  margin-top: 32px;
`;

const ContentInput = styled.input`
  width: 100%;
  height: 56px;
  margin-top: 12px;
  padding: 16px 24px;
  background-color: var(--gray-100);
  border: 1px solid transparent;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 400;
  color: #9ca3af;
`;

const ContentSection = styled.div`
  margin-top: 24px;
`;

const ContentTextArea = styled.textarea`
  width: 100%;
  height: 282px;
  margin-top: 12px;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 400;
  color: #9ca3af;
  background-color: var(--gray-100);
  border: 1px solid transparent;
  border-radius: 12px;
  resize: none;
`;

const ImageSection = styled.div`
  margin-top: 24px;
  width: 282px;
  height: 320px;

  & > input {
    margin-top: 12px;
  }
`;
