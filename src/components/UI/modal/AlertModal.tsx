// src/components/UI/modal/AlertModal.tsx
import React from "react";
import BaseModal from "./BaseModal";
import Button from "../Button";

interface AlertModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const AlertModal = ({ isOpen, message, onClose }: AlertModalProps) => {
  if (!isOpen) return null;

  return (
    <BaseModal onClose={onClose}>
      <p
        className="mb-4 text-center"
        dangerouslySetInnerHTML={{ __html: message }}
      />
      <Button label="확인" onClick={onClose} />
    </BaseModal>
  );
};

export default AlertModal;
