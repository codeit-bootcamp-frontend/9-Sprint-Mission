import { useState } from "react";
import dropdownImg from "../assets/image/dropdownImg.svg";
import sortIcon from "../assets/image/ic_sort.svg";

const Dropdown = ({ selectedOption, setSelectedOption, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setPage(1);
    setIsOpen(false);
  };

  const dropdownImgSrc = window.innerWidth <= 768 ? sortIcon : dropdownImg;

  return (
    <div className="relative inline-block w-[130px] Mobile:w-[42px] h-[42px]">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-between Mobile:justify-center w-full h-full rounded-xl outline outline-1 outline-gray-200 px-[19px] py-[8px] Mobile:p-0 bg-white text-lg text-gray-800 hover:bg-gray-100"
      >
        <span className="Mobile:hidden">{selectedOption}</span>
        <img
          src={dropdownImgSrc}
          alt="Dropdown 아이콘"
          className="self-center"
        />
      </button>

      {isOpen && (
        <div className="absolute -bottom-[92px] right-0 z-10 w-[130px] bg-white rounded-xl outline outline-1 outline-gray200">
          <button
            onClick={() => handleOptionClick("최신순")}
            className="w-full h-[42px] rounded-t-xl text-lg text-gray-800 hover:bg-gray-100 border-b"
          >
            최신순
          </button>
          <button
            onClick={() => handleOptionClick("좋아요순")}
            className="w-full h-[42px] rounded-b-xl text-lg text-gray-800 hover:bg-gray-100"
          >
            좋아요순
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
