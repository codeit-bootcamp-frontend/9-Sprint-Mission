import styled from "styled-components";

const S = {};

S.AllItemsSectionHeader = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;

  &:first-child {
    padding-bottom: 8px;
  }

  &:nth-child(2) {
    padding-bottom: 16px;
  }
`;

S.Title = styled.h1`
  flex-grow: 1;
  color: #111827;
  font-weight: bold;
  font-size: 20px;
  line-height: normal;
`;

S.SearchBarWrapper = styled.div`
  display: flex;
  background-color: #f3f4f6;
  border-radius: 12px;
  padding: 9px 16px;
  flex: 1;
  align-items: center;
`;

S.AllItemsCardSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 8px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 40px 16px;
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 40px 24px;
  }
`;

S.PaginationBarWrapper = styled.div`
  padding-top: 40px;
  padding-bottom: 80px;
`;

S.SearchBarInput = styled.input`
  border: none;
  flex: 1;
  background-color: inherit;
  margin-left: 4px;

  &::placeholder {
    color: #9ca3af;
    font-size: 16px;
  }

  &:focus {
    outline: none;
  }
`;

export default S;
