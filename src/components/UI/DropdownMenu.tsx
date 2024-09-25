// src/components/UI/InputItem.tsx
import React from "react";
import { useState } from "react";
import { ProductSortOption } from "@/types/product";
import { ArticleSortOption } from "@/types/article";
import SortIcon from "@/images/icons/ic_sort.svg";

interface DropdownMenuProps<T extends ProductSortOption | ArticleSortOption> {
  onSortSelection: (sortOption: T) => void;
  type: "product" | "article";
}

const DropdownMenu = <T extends ProductSortOption | ArticleSortOption>({
  onSortSelection,
  type,
}: DropdownMenuProps<T>) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="relative">
      <button
        className="border border-gray-200 rounded-xl p-2 ml-2"
        onClick={toggleDropdown}
      >
        <SortIcon />
      </button>

      {isDropdownVisible && (
        <div className="absolute top-[110%] right-0 bg-white rounded-lg border border-gray-200 shadow-md z-[99]">
          <div
            className="py-3 px-11 border-b border-gray-200 text-base text-gray-800 cursor-pointer last:border-b-0"
            onClick={() => {
              onSortSelection("recent" as T);
              setIsDropdownVisible(false);
            }}
          >
            최신순
          </div>
          <div
            className="py-3 px-11 border-b border-gray-200 text-base text-gray-800 cursor-pointer last:border-b-0"
            onClick={() => {
              onSortSelection((type === "product" ? "favorite" : "like") as T);
              setIsDropdownVisible(false);
            }}
          >
            인기순
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
