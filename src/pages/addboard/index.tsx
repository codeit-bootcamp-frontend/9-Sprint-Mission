// 게시글 작성 페이지

import { ChangeEvent, useState } from "react";
import S from "./index.style";
import FileInput from "@/components/UI/Input/FileInput";

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
    <S.Container>
      <S.Header>
        <S.Title>게시글 쓰기</S.Title>
        <S.SubmitButton disabled={contentIsEmpty}>등록</S.SubmitButton>
      </S.Header>
      <S.TitleSection>
        <S.Title>*제목</S.Title>
        <S.ContentInput
          name="title"
          value={title}
          type="text"
          onChange={handleTitleChange}
          placeholder="제목을 입력해주세요."
        />
      </S.TitleSection>
      <S.ContentSection>
        <S.Title>*내용</S.Title>
        <S.ContentTextArea
          name="content"
          value={content}
          onChange={handleContentChange}
          placeholder="내용을 입력해주세요."
        />
      </S.ContentSection>
      <S.ImageSection>
        <S.Title>이미지</S.Title>
        <FileInput />
      </S.ImageSection>
    </S.Container>
  );
}
