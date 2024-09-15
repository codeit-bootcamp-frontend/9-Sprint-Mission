import styled from "styled-components";
import XImg from "../../../assets/X.svg";

function TagItem({ item, onDelete, isDelete }) {
  const handleDeleteClick = () => onDelete(item.id);

  return (
    <StyledTagItem>
      <span>#{item.value}</span>
      <TagItemButton>
        {isDelete && (
          <img
            src={XImg}
            alt="취소"
            width="20"
            height="20"
            onClick={handleDeleteClick}
          />
        )}
      </TagItemButton>
    </StyledTagItem>
  );
}

export default TagItem;

const StyledTagItem = styled.div`
  padding: 6px 12px 6px 16px;
  background-color: #f3f4f6;
  border-radius: 26px;
  font-size: 16px;
  font-weight: 400px;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 9px;
`;

const TagItemButton = styled.button`
  width: 20px;
  height: 20px;
  border: 0;
  cursor: pointer;
`;
