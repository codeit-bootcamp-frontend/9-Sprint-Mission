import React, { useState, useEffect } from 'react';
import ArrowDown from '@/images/icons/ic_arrow_down.svg';

type DropdownProps = {
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    // Dropdown이 열릴 때 선택된 값이 변경되면 UI를 업데이트합니다.
    setIsOpen(false);
  }, [selectedValue]);

  return (
    <div className='relative inline-block border border-gray-300 rounded-md'>
      <button
        onClick={toggleDropdown}
        className='flex items-center border border-gray-300 rounded-md p-2'
      >
        {selectedValue === 'recent' ? '최신순' : '좋아요순'}
        <ArrowDown
          className={`ml-2 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg'>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className='p-2 hover:bg-gray-200 cursor-pointer'
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
