import styled from "styled-components";

const S = {
  Container: styled.ul`
    position: relative;
    margin-top: 8px;
    padding: 0;
    list-style: none;
    background-color: white;
    z-index: 99;
  `,

  Content: styled.li`
    width: 130px;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--gray-200);
    z-index: 99;

    &:nth-child(1) {
      border-radius: 12px 12px 0 0;
    }

    &:nth-child(2) {
      border-radius: 0 0 12px 12px;
    }
  `,
};

export default S;
