// src/components/UI/modal/AlertModal.tsx
import React from "react";
import BaseModal from "./BaseModal";
import Button from "../Button";

interface AlertModalProps {
  message: string;
  onClose: () => void;
}

const AlertModal = ({ message, onClose }: AlertModalProps) => {
  return (
    <BaseModal onClose={onClose}>
      <p className="mb-4">{message}</p>
      <Button label="확인" onClick={onClose} />
    </BaseModal>
  );
};

export default AlertModal;
