import { DropdownMenuProps } from "@/types/dropdown";
import S from "./DropdownMenu.style";

const DropdownMenu = ({ options, onSelect }: DropdownMenuProps) => {
  return (
    <S.Container>
      {options.map((option) => (
        <S.Content key={option.value} onClick={() => onSelect(option)}>
          {option.label}
        </S.Content>
      ))}
    </S.Container>
  );
};

export default DropdownMenu;
