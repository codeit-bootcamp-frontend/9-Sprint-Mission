import styled from "styled-components";

const S = {
  PaginationBar: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  `,

  PaginationButton: styled.button`
    border: 1px solid #e5e7eb;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    color: #6b7280;
    font-weight: 600;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:disabled {
      cursor: default;
      opacity: 0.5;
    }

    &:active {
      background-color: var(--blue);
      color: #fff;
    }
  `,
};

export default S;
