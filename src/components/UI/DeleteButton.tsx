// src/components/UI/InputItem.tsx
import React from "react";
import CloseIcon from "@/images/icons/ic_x.svg";

interface DeleteButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
}

const DeleteButton = ({ onClick, label }: DeleteButtonProps) => {
  return (
    <button
      className="w-5 h-5 bg-gray-400 rounded-full flex justify-center items-center hover:bg-blue-500 transition-colors duration-200"
      aria-label={`${label} 삭제`}
      onClick={onClick}
    >
      <CloseIcon className="w-3 h-3 text-white" />
    </button>
  );
};

export default DeleteButton;
