// src/components/UI/ConfirmModal.tsx
import React from "react";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({ message, onConfirm, onCancel }: ConfirmModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full text-center">
        {/* 체크 마크 영역 */}
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

        {/* 메시지 */}
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: message }}></p>

        {/* 버튼들 */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 rounded border border-gray-300 text-gray-700 hover:bg-gray-200"
          >
            아니오
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
