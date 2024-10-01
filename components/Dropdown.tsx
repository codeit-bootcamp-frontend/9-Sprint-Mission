import React, { ReactNode, useState } from "react";
import arrowDown from "@/public/ic_arrow_down.png";
import Image from "next/image";

interface DropDownItem {
  id: string;
  name: string;
}

interface Props {
  dropData: DropDownItem[];
  order: string;
  title: string;
  onClick: (id: string) => void;
}

export default function Dropdown({ dropData, order, title, onClick }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

  function handleItemSelect(id: string) {
    onClick(id);
    setIsOpen(false);
  }

  return (
    <div className='realtvie'>
      <div
        onClick={handleClick}
        className='flex justify-between items-center w-32 border rounded-xl px-5 py-3 cursor-pointer'
      >
        <span>{title} </span>
        <Image src={arrowDown} alt='화살표_이미지' />
      </div>
      {isOpen && (
        <ul className='absolute mt-2 w-32 bg-white border rounded-xl shadow-lg'>
          {dropData.map((item) => (
            <li
              key={item.id}
              onClick={() => handleItemSelect(item.id)}
              className='text-lg text-center border-b py-2 cursor-pointer'
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
