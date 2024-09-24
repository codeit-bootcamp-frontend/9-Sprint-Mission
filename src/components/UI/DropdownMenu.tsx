// src/components/UI/InputItem.tsx
import React from "react";
import { useState } from "react";
import { ProductSortOption } from "@/types/product";
import SortIcon from "@/images/icons/ic_sort.svg";

interface DropdownMenuProps {
  onSortSelection: (sortOption: ProductSortOption) => void;
}

const DropdownMenu = ({ onSortSelection }: DropdownMenuProps) => {
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
              onSortSelection("recent");
              setIsDropdownVisible(false);
            }}
          >
            최신순
          </div>
          <div
            className="py-3 px-11 border-b border-gray-200 text-base text-gray-800 cursor-pointer last:border-b-0"
            onClick={() => {
              onSortSelection("favorite");
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
