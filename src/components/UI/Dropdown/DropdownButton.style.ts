import styled from "styled-components";

const S = {
  Button: styled.button`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    border: 1px solid var(--gray-200);
    border-radius: 12px;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: 400;
    color: #1f2937;

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      width: 130px;
      height: 42px;
    }

    @media ${({ theme }) => theme.mediaQuery.mobile} {
      width: 42px;
      height: 42px;
    }
  `,
};

export default S;
