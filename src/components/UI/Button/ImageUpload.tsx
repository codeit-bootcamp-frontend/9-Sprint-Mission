import React, { useState } from "react";
import { Label } from "./InputItem";
import styled, { css } from "styled-components";
import { ReactComponent as PlusIcon } from "../../assets/images/icons/ic_plus.svg";
import DeleteButton from "./DeleteButton";

// 스타일 정의
const ImageUploadContainer = styled.div`
  display: flex;
  gap: 8px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    gap: 18px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    gap: 24px;
  }
`;

const squareStyles = css`
  width: calc(50% - 4px);
  max-width: 200px;
  aspect-ratio: 1 / 1;
  border-radius: 12px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    width: 162px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    width: 282px;
  }
`;

// file input과 연관 짓기 위해 버튼이 대신 label로 설정
const UploadButton = styled.label`
  background-color: ${({ theme }) => theme.colors.gray[1]};
  color: ${({ theme }) => theme.colors.gray[0]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[2]};
  }

  ${squareStyles}
`;

const ImagePreview = styled.div<{ src: string }>`
  // src의 타입을 정의
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  position: relative; // DeleteButton 포지셔닝을 위해 추가

  ${squareStyles}
`;

const DeleteButtonWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

// 컴포넌트의 props 타입 정의
interface ImageUploadProps {
  title?: string; // title은 선택적 prop으로 정의
}

const ImageUpload: React.FC<ImageUploadProps> = ({ title }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  // 파일 선택 시 이미지 변경 처리
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // null 체크 및 첫 번째 파일 선택
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
    }
  };

  // 이미지 삭제 처리
  const handleDelete = () => {
    setImagePreviewUrl(""); // 미리보기 URL 리셋
  };

  return (
    <div>
      {title && <Label>{title}</Label>}

      <ImageUploadContainer>
        {/* HiddenFileInput의 id와 label의 htmlFor 값을 매칭 */}
        <UploadButton htmlFor="image-upload">
          <PlusIcon />
          이미지 등록
        </UploadButton>

        <HiddenFileInput
          id="image-upload"
          type="file"
          onChange={handleImageChange}
          accept="image/*" // 이미지 파일만 업로드 가능하도록 제한
        />

        {/* 업로드된 이미지가 있으면 썸네일 렌더링 */}
        {imagePreviewUrl && (
          <ImagePreview src={imagePreviewUrl}>
            <DeleteButtonWrapper>
              <DeleteButton onClick={handleDelete} label="이미지 파일" />
            </DeleteButtonWrapper>
          </ImagePreview>
        )}
      </ImageUploadContainer>
    </div>
  );
};

export default ImageUpload;
