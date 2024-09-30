import styles from "@/components/Dropdown.module.css";
import { Option } from "@/types/types";
import axios from "@/lib/axios";
import Image from "next/image";
import { useState } from "react";

interface Props {
  optionList: Option[];
  setOrder: React.Dispatch<React.SetStateAction<string>>;
}

export default function Dropdown({ optionList, setOrder }: Props) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState("최신순");

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handelClick = (order: string, option: string) => {
    setIsDropdownVisible(false);
    setSelectedBtn(option);
    setOrder(order);
  };

  return (
    <>
      <div className={styles["order-container"]}>
        <button
          onClick={toggleDropdown}
          className={styles["order-box"]}
          type="button"
        >
          <span>{selectedBtn}</span>
          <Image src="/ic_arrow_down.png" alt="" width={24} height={24} />
        </button>
        {isDropdownVisible && (
          <div className={styles["order-btn"]}>
            {optionList.map((option) => (
              <button
                type="button"
                key={option.id}
                onClick={() => handelClick(option.order, option.option)}
                className={styles["option-btn"]}
              >
               {option.option}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
