// src/components/UI/Button.tsx
import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "primary" | "secondary";
}

const Button = ({ label, onClick, type = "primary" }: ButtonProps) => {
  const buttonClass =
    type === "primary"
      ? "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      : "px-4 py-2 bg-gray-100 text-gray-700 rounded border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400";

  return (
    <button onClick={onClick} className={buttonClass}>
      {label}
    </button>
  );
};

export default Button;
