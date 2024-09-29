import { DropdownButtonProps } from "@/types/dropdown";
import S from "./DropdownButton.style";

const DropdownButton = ({
  onClick,
  isOpen,
  selectedLabel,
}: DropdownButtonProps) => {
  return (
    <S.Button onClick={onClick}>
      {selectedLabel} {/* 선택된 옵션의 라벨 표시 */}
      {isOpen ? "▴" : "▾"}
    </S.Button>
  );
};

export default DropdownButton;
