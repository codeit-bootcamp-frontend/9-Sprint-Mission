import React, { createContext, useContext, useState } from "react";

interface SortContextProps {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

const SortContext = createContext<SortContextProps | undefined>(undefined);

export const SortProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sortBy, setSortBy] = useState<string>("recent"); // 기본 정렬 기준을 좋아요순으로 설정

  return (
    <SortContext.Provider value={{ sortBy, setSortBy }}>
      {children}
    </SortContext.Provider>
  );
};

export const useSort = () => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error("useSort는 SortProvider 내에서만 사용할 수 있습니다.");
  }
  return context;
};
