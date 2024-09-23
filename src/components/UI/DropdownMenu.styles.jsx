import styled from "styled-components";

const S = {};

S.SortButtonWrapper = styled.div`
  position: relative;
`;

S.SortDropdownTriggerButton = styled.button`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 9px;
  margin-left: 8px;
`;

S.DropdownMenu = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 99;
`;

S.DropdownItem = styled.div`
  padding: 12px 44px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 16px;
  color: #1f2937;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

export default S;
