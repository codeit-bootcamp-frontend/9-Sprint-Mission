// src/components/UI/modal/BaseModal.tsx
import React, { ReactNode, useEffect } from "react";

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

  return (
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
};

export default BaseModal;
