// src/components/UI/InputItem.tsx
import React, { useState } from "react";
import { ProductSortOption } from "@/types/product";
import { ArticleSortOption } from "@/types/article";
import ArrowDownIcon from "/images/icons/ic_arrow_down.svg";

interface DropdownMenuProps<T extends ProductSortOption | ArticleSortOption> {
  onSortSelection: (sortOption: T) => void;
  type: "product" | "article";
}

const DropdownMenu = <T extends ProductSortOption | ArticleSortOption>({
  onSortSelection,
  type,
}: DropdownMenuProps<T>) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<T>("recent" as T);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleOptionSelect = (option: T) => {
    setSelectedOption(option);
    onSortSelection(option);
    setIsDropdownVisible(false);
  };

  const getOptionText = (option: T) => {
    switch (option) {
      case "recent":
        return "최신순";
      case "favorite":
      case "like":
        return "인기순";
      default:
        return "정렬";
    }
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center rounded-xl w-[130px] h-[42px] relative"
        style={{ border: "1px solid #E5E7EB" }}
        onClick={toggleDropdown}
      >
        <span className="text-base text-gray-800 w-[80px]">
          {getOptionText(selectedOption)}
        </span>
        <ArrowDownIcon className="w-10 h-6 ml-2 " />
      </button>

      {isDropdownVisible && (
        <div className="absolute top-[110%] right-0 bg-white rounded-lg border border-gray-200 shadow-md z-[99] w-[130px]">
          <div
            className="py-3 px-4 border-b border-gray-200 text-base text-gray-800 cursor-pointer last:border-b-0"
            onClick={() => handleOptionSelect("recent" as T)}
          >
            최신순
          </div>
          <div
            className="py-3 px-4 border-b border-gray-200 text-base text-gray-800 cursor-pointer last:border-b-0"
            onClick={() =>
              handleOptionSelect(
                (type === "product" ? "favorite" : "like") as T
              )
            }
          >
            인기순
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
