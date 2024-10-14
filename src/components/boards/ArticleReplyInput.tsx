import styled from "styled-components";
import instance from "@/api/axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/styles/CommonStyles";
import { useRouter } from "next/router";

export default function ArticleReplyInput({
  refreshComments,
}: {
  refreshComments: () => void;
}) {
  const router = useRouter();
  const { id } = router.query;
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!value) return;
    try {
      const response = await instance.post(`/articles/${id}/comments`, {
        content: value,
      });

      if (response.status === 201) {
        setValue("");
        refreshComments(); // 댓글 리스트를 갱신하는 함수 호출
      } else {
        console.error("댓글 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("서버 오류:", error);
    }
  };

  return (
    <Container>
      <Title>댓글달기</Title>
      <Form onSubmit={handleSubmit}>
        <ReplyInput
          value={value}
          onChange={handleChange}
          placeholder="댓글을 입력해주세요."
        />
        <SubmitButton disabled={!value} type="submit">
          등록
        </SubmitButton>
      </Form>
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
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
  color: var(--gray-400); /* 오타 수정: gary -> gray */
`;

const SubmitButton = styled(Button)`
  margin-top: 16px;
  margin-left: auto;
`;
