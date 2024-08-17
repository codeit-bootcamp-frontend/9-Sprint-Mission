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

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="image-upload-wrapper">
      <div className="image-upload-placeholder" onClick={triggerFileUpload}>
        <PlusImage alt="Upload" />
        <p className="upload-text">이미지 등록</p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="image-upload-input"
        />
      </div>

      {image && (
        <div className="image-preview">
          <img src={image} alt="Uploaded" />
          <button
            onClick={() => onRemoveImage()}
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
