import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 94px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: var(--gray-900);
`;

const ArticleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  height: 169px;
`;

const S = {
  Container,
  Title,
  ArticleWrap,
};

export default S;
