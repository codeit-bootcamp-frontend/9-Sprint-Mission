import { useRef, useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import Image from "next/image";
import Plus from "@/assets/images/icons/ic_plus.svg";

export default function FileInput() {
  const [imagePreview, setImagePreview] = useState<string | null>(null); // 이미지 미리보기 상태
  const [error, setError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Plus 아이콘을 누를시 화면에는 보이지 않는 FileInput을 누르게끔 설정
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    // files가 null인지 체크
    if (files && files.length > 0) {
      const file = files[0];

      if (files.length > 1) {
        setError(true);
      } else {
        setError(false);
        setImagePreview(URL.createObjectURL(file)); // 파일을 미리보기 URL로 설정
      }
    }
  };

  // URL.createObjectURL 부수효과 제거
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview); // 기존 URL 해제
      }
    };
  }, [imagePreview]);

  return (
    <Container>
      <UploadButton onClick={handleButtonClick}>
        {imagePreview ? (
          <PreviewImage src={imagePreview} alt="selected image" />
        ) : (
          <>
            <Image src={Plus} width={48} height={48} alt="file add icon" />
            <Label>이미지 등록</Label>
          </>
        )}
      </UploadButton>
      <HiddenFileInput
        type="file"
        accept="image/*"
        ref={fileInputRef}
        multiple
        onChange={handleFileChange}
      />
      {error && <ErrorMessage>하나의 이미지만 선택해 주세요.</ErrorMessage>}
    </Container>
  );
}

// 스타일 컴포넌트
const Container = styled.div`
  margin-top: 12px;
`;

const UploadButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 282px;
  height: 282px;
  background-color: #f5f7fa;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
`;

const Label = styled.div`
  font-size: 14px;
  color: #a0a4a8;
  margin-top: 8px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ErrorMessage = styled.span`
  font-size: 14px;
  color: var(--red);
  margin-top: 6px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;
