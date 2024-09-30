// src/components/UI/AlertModal.tsx
import React from "react";

interface AlertModalProps {
  message: string;
  onClose: () => void;
}

const AlertModal = ({ message, onClose }: AlertModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full text-center">
        {/* 메시지 */}
        <p className="mb-4">{message}</p>

        {/* 확인 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
