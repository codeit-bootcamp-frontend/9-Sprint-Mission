import { useState } from "react";
import { ReactComponent as SortIcon } from "../../assets/images/icons/ic_sort.svg";
import S from "./DropdownMenu.styles";

interface DropdownMenuProps {
  onSortSelection: (sortType: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onSortSelection }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <S.SortButtonWrapper>
      <S.SortDropdownTriggerButton onClick={toggleDropdown}>
        <SortIcon />
      </S.SortDropdownTriggerButton>

      {isDropdownVisible && (
        <S.DropdownMenu>
          <S.DropdownItem
            onClick={() => {
              onSortSelection("recent");
              setIsDropdownVisible(false);
            }}
          >
            최신순
          </S.DropdownItem>
          <S.DropdownItem
            onClick={() => {
              onSortSelection("favorite");
              setIsDropdownVisible(false);
            }}
          >
            인기순
          </S.DropdownItem>
        </S.DropdownMenu>
      )}
    </S.SortButtonWrapper>
  );
};

export default DropdownMenu;
