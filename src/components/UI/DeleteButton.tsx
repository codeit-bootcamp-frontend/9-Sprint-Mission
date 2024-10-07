// src/components/UI/InputItem.tsx
import React from "react";
import Image from "next/image";

// public 폴더 경로 문자열로 대체
const CLOSE_ICON = "/images/icons/ic_x.png";

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
      <Image
        src={CLOSE_ICON}
        width={24}
        height={24}
        alt="delete icon"
        className="w-3 h-3 text-white"
      />
    </button>
  );
};

export default DeleteButton;
