// dropdown-list.tsx
import styled from "styled-components";
import { DropdownListProps } from "../types/dropdown-list";

// Styled Components
const StyledDropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 10px;
  z-index: 1000;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 130px;
  border-radius: 12px;
`;

const StyledDropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  border-radius: 12px;

  &:hover {
    color: white;
    background-color: var(--blue-100);
  }
`;

function DropdownList({ sortOptions, onSortSelection }: DropdownListProps) {
  return (
    <StyledDropdownList>
      {sortOptions.map((option) => (
        <StyledDropdownItem
          key={option.value}
          onClick={() => onSortSelection(option.value)}
        >
          {option.label}
        </StyledDropdownItem>
      ))}
    </StyledDropdownList>
  );
}

export default DropdownList;
