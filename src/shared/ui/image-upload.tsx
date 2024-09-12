// image-upload.tsx
import { useRef } from "react";
import styled from "styled-components";
import { ReactComponent as PlusImage } from "../assets/images/icons/ic_plus.svg";
import { ReactComponent as DeleteImage } from "../assets/images/icons/ic_delete.svg";
import { ImageUploadProps } from "../types/image-upload";

// Styled Components
const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  margin: 0 0 10px;
`;

const Placeholder = styled.label`
  width: 168px;
  height: 168px;
  background-color: #f9f9f9;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed #ccc;
  cursor: pointer;
  margin-right: 20px;

  img {
    width: 48px;
    height: 48px;
    margin-bottom: 10px;
  }

  @media (min-width: 768px) {
    width: 200px;
    height: 200px;
  }

  @media (min-width: 1200px) {
    width: 220px;
    height: 220px;
  }
`;

const UploadText = styled.span`
  margin-top: 8px;
  font-size: 16px;
  line-height: 26px;
  color: var(--gray-400);
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImagePreview = styled.div`
  margin-top: 8px;
  position: relative;
  width: 168px;
  height: 168px;
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (min-width: 768px) {
    width: 200px;
    height: 200px;
  }

  @media (min-width: 1200px) {
    width: 220px;
    height: 220px;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ImageUpload: React.FC<ImageUploadProps> = ({
  id,
  name,
  image,
  setImage,
  onRemoveImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          try {
            setImage(reader.result as string);
          } catch (error) {
            console.error("setImage error: ", error);
          }
        } else {
          console.error("FileReader result error");
        }
      };

      reader.onerror = () => {
        console.error("Failed to read the file");
      };

      reader.readAsDataURL(file);
    }
  };

  const clearFileInputRef = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Wrapper>
      <Placeholder htmlFor="image-upload">
        <PlusImage />
        <UploadText>이미지 등록</UploadText>
      </Placeholder>
      <HiddenInput
        id="image-upload"
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
      />

      {image && (
        <ImagePreview>
          <img src={image} alt="Uploaded" />
          <RemoveButton onClick={() => onRemoveImage(clearFileInputRef)}>
            <DeleteImage />
          </RemoveButton>
        </ImagePreview>
      )}
    </Wrapper>
  );
};

export default ImageUpload;
