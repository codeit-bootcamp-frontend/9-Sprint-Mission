// 게시글 작성 페이지
import { ChangeEvent, useState } from "react";
import { Button } from "@/styles/CommonStyles";
import { useRouter } from "next/router";
import FileInput from "@/components/ui/input/FileInput";
import styled from "styled-components";
import instance from "@/api/axios";

export default function AddBoard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // 이미지 미리보기 상태
  const router = useRouter();

  const contentIsEmpty = !(title && content);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0]; // 실제 파일 객체
      setImagePreview(URL.createObjectURL(file)); // 미리보기용 URL
      setImageFile(file); // 파일 자체를 저장
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageFile);

    // const signUp = await instance.post(`/auth/signUp`, {
    //   email: "wn8624@naver.com",
    //   nickname: "junyeong",
    //   password: "0000000",
    //   passwordConfirmation: "0000000",
    // });

    const signIn = await instance.post(`/auth/signIn`, {
      email: "wn8624@naver.com",
      password: "0000000",
    });

    if (signIn) {
      const accessToken = signIn.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
    }

    const accessToken = localStorage.getItem("accessToken");
    const res = await instance.post("/articles/", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data", // 파일을 업로드할 때는 multipart/form-data 사용
      },
    });

    if (res) {
      router.push(`/articles/${res.data.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Header>
          <Title>게시글 쓰기</Title>
          <SubmitButton disabled={contentIsEmpty} type="submit">
            등록
          </SubmitButton>
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
          <FileInput onChange={handleFileChange} image={imagePreview} />
        </ImageSection>
      </Container>
    </form>
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
