import { useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import Plus from "@/assets/images/icons/ic_plus.svg";

export default function ImageUploader() {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // 버튼을 클릭하면 파일 선택 창 열기
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      // 추가적인 파일 처리 로직을 여기에 추가
    }
  };

  return (
    <Container>
      <UploadButton onClick={handleButtonClick}>
        <Image src={Plus} width={48} height={48} alt="file add icon" />
        <Label>이미지 등록</Label>
      </UploadButton>
      <HiddenFileInput
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
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
`;

const Label = styled.div`
  font-size: 14px;
  color: #a0a4a8;
  margin-top: 8px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;
