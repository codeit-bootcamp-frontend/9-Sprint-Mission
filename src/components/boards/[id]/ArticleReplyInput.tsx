import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import { Button } from "@/styles/CommonStyles";

export default function ArticleReplyInput() {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <Container>
      <Title>댓글달기</Title>
      <ReplyInput
        value={value}
        onChange={handleChange}
        placeholder="댓글을 입력해주세요."
      />
      <SubmitButton disabled={!value}>등록</SubmitButton>
    </Container>
  );
}

// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-900);
`;

const ReplyInput = styled.textarea`
  width: 100%;
  height: 104px;
  margin-top: 9px;
  border: none;
  border-radius: 12px;
  background-color: var(--gray-100);
  padding: 16px 24px;
  resize: none;
  color: var(--gary-400);
`;

const SubmitButton = styled(Button)`
  margin-top: 16px;
  margin-left: auto;
`;
