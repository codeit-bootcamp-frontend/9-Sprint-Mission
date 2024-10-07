// src/components/UI/modal/BaseModal.tsx
import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface BaseModalProps {
  children: ReactNode;
  onClose: () => void;
}

const BaseModal = ({ children, onClose }: BaseModalProps) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // createPortal을 사용하기 위한 대상 요소
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    console.error("Modal root element not found");
    return null;
  }

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full text-center">
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, modalRoot);
};

export default BaseModal;
