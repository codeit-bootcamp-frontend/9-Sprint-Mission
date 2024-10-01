import { useEffect, useState } from "react";
import { DropdownButtonProps } from "@/types/dropdown";
import SortIcon from "@/assets/images/icons/ic_sort.svg";
import S from "./DropdownButton.style";
import Image from "next/image";

const DropdownButton = ({
  onClick,
  isOpen,
  selectedLabel,
}: DropdownButtonProps) => {
  const [pageSize, setPageSize] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 744) {
        setPageSize("mobile");
      } else if (window.innerWidth > 744) {
        setPageSize("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <S.Button onClick={onClick}>
      {pageSize !== "mobile" && (
        <>
          <span>{selectedLabel}</span>
          {isOpen ? <span>▴</span> : <span>▾</span>}
        </>
      )}
      {pageSize === "mobile" && (
        <Image src={SortIcon} width={24} height={24} alt="dropdown button" />
      )}
    </S.Button>
  );
};

export default DropdownButton;
