import styled from "styled-components";

const AddItemButton = styled.button`
  border-radius: 8px;
  border-style: none;
  padding: 12px 23px 12px 23px;
  background-color: ${(props) => (props.disabled ? "#9ca3af" : "#3692ff")};
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
  line-height: 19.09px;
`;

export default AddItemButton;
