// src/components/UI/LoadingSpinner.tsx
import React from "react";
import { PulseLoader } from "react-spinners";

interface LoadingSpinnerProps {
  isLoading: boolean;
  size?: number;
  color?: string;
}

const LoadingSpinner = ({
  isLoading,
  size = 20,
  color = "#3692ff",
}: LoadingSpinnerProps) => {
  // 로딩 중이 아니면 null 반환
  if (!isLoading) return null;

  // 로딩 중이면 스피너 표시
  return (
    <div className="fixed inset-0 bg-white z-[9998]">
      <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-[9999]">
        <PulseLoader size={size} color={color} />
      </div>
    </div>
  );
};

export default LoadingSpinner;
