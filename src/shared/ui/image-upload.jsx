import { useRef } from "react";
import PlusImage from "../assets/images/icons/ic_plus.svg";
import DeleteImage from "../assets/images/icons/ic_delete.svg";
import "./image-upload.css";

const ImageUpload = ({ image, setImage, onRemoveImage }) => {
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          try {
            setImage(reader.result);
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
        <PlusImage alt="Upload" />
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
            <DeleteImage alt="Delete" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
