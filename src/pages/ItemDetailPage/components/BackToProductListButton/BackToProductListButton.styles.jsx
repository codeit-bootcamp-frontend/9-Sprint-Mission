import styled from "styled-components";

const S = {};

S.Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 48px;
  font-size: 18px;
  color: white;
  margin: 0 auto;
  background-color: #3692ff;
  border-radius: 40px;
  padding: 12px 64px;
  white-space: nowrap;

  img {
    margin-left: 8px; /* 아이콘과 텍스트 사이에 간격 추가 */
  }
`;

export default S;
