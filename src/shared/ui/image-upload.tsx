import { useRef } from "react";
import { ReactComponent as PlusImage } from "../assets/images/icons/ic_plus.svg";
import { ReactComponent as DeleteImage } from "../assets/images/icons/ic_delete.svg";
import "./image-upload.css";

// Props 타입 정의
interface ImageUploadProps {
  id: string;
  name: string;
  image: string | null;
  setImage: (image: string) => void;
  onRemoveImage: (clearFileInputRef: () => void) => void;
}

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
            setImage(reader.result as string); // FileReader result는 string으로 캐스팅 필요
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
    <div className="image-upload-wrapper">
      <label
        className="image-upload-placeholder upload-text"
        htmlFor="image-upload"
      >
        <PlusImage />
        이미지 등록
      </label>
      <input
        id="image-upload"
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="image-upload-input"
      />

      {image && (
        <div className="image-preview">
          <img src={image} alt="Uploaded" />
          <button
            onClick={() => onRemoveImage(clearFileInputRef)}
            className="image-remove-button"
          >
            <DeleteImage />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
