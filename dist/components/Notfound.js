import { jsx as _jsx } from "react/jsx-runtime";
import styled from 'styled-components';
const NotContent = styled.div `
  min-height: 100vh;
  height: 100%;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  padding: 5rem 0;
`;
const Notfound = () => {
    return _jsx(NotContent, { children: "\uC798\uBABB\uB41C \uD398\uC774\uC9C0\uC785\uB2C8\uB2E4. \uD83D\uDE45\u200D\u2640\uFE0F" });
};
export default Notfound;
