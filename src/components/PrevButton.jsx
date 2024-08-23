import styled from "styled-components";
import back from "../assets/ic_back.png";


const PrevButton = styled.button`

  height: 48px;
  background-color: #3692ff;
  border: none;
  border-radius: 40px;
  padding: 0 64px;
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
  color: #f3f4f6;
  background-image: url(${back});
  background-repeat: no-repeat;
  background-size: 24px 24px;
  background-position: 85% 50%;
  cursor: pointer;
  
`;

export default PrevButton;