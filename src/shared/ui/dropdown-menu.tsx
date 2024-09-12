import React from "react";
import styled from "styled-components";

// Styled DropdownMenu and DropdownItem
const DropdownWrapper = styled.div`
  display: block;
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #ffffff;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 1000;
  min-width: 120px;
  padding: 8px 0;
`;

const DropdownItemWrapper = styled.a`
  display: block;
  padding: 8px 16px;
  font-size: 14px;
  color: #333;
  text-decoration: none;

  &:hover {
    background-color: #f1f1f1;
  }
`;

// DropdownMenuItem Component
const DropdownItem: React.FC<{ onClick: () => void; label: string }> = ({
  onClick,
  label,
}) => {
  return (
    <DropdownItemWrapper
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {label}
    </DropdownItemWrapper>
  );
};

// DropdownMenu Component Type
interface DropdownMenuProps {
  children: React.ReactNode;
}

// DropdownMenu Component
const DropdownMenu: React.FC<DropdownMenuProps> & {
  Item: typeof DropdownItem;
} = ({ children }) => {
  return <DropdownWrapper>{children}</DropdownWrapper>;
};

// Compound Pattern 적용
DropdownMenu.Item = DropdownItem;

export default DropdownMenu;
