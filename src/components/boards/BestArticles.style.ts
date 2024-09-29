import styled from "styled-components";

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 94px;
  `,

  Title: styled.h1`
    font-size: 20px;
    font-weight: 700;
    color: var(--gray-900);
  `,
  ArticleWrap: styled.div`
    display: flex;
    justify-content: space-between;
    gap: 24px;
    width: 100%;
    height: 169px;
  `,
};

export default S;
