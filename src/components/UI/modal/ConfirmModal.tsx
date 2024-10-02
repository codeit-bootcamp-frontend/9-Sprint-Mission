// src/components/UI/modal/ConfirmModal.tsx
import React from "react";
import BaseModal from "./BaseModal";
import Button from "../Button";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({ message, onConfirm, onCancel }: ConfirmModalProps) => {
  return (
    <BaseModal onClose={onCancel}>
      <div className="mb-4 flex justify-center">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      <p className="mb-4">{message}</p>
      <div className="flex justify-center space-x-4">
        <Button label="아니오" onClick={onCancel} type="secondary" />
        <Button label="확인" onClick={onConfirm} />
      </div>
    </BaseModal>
  );
};

export default ConfirmModal;
