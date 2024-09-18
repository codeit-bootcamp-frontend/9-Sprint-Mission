import styled from "styled-components";

export const Divider = styled.div`
  margin-top: 40px;
  max-width: 1190px;
  height: 1px;
  border: 1px solid var(--gray-200);

  @media (max-width: 745px) {
    margin-top: 32px;
    max-width: 696px;
  }

  @media (max-width: 375px) {
    margin-top: 0px;
    max-width: 344px;
  }
`;
