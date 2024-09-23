import styled from "styled-components";

const S = {};

S.Container = styled.div`
  color: #1f2937;
  overflow: hidden;
  cursor: pointer;
`;

S.ItemSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
`;

S.itemCardThumbnail = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 1;
  margin-bottom: 16px;
`;

S.ItemName = styled.h2`
  font-size: 16px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

S.ItemPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

S.FavoriteCount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #4b5563;
  font-size: 12px;
`;

export default S;
