import { useRef, useState } from "react";
import PlusImage from "../assets/images/icons/ic_plus.svg";
import "./image-upload.css";

const ImageUpload = ({ image, setImage }) => {
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
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
            onClick={() => setImage(null)}
            className="image-remove-button"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
