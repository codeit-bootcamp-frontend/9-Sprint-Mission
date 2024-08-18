import styled from 'styled-components';
import ic_imgdel from '../api/assets/images/icons/ic_imgdel.png';

const Chip = styled.div`
  display: flex;
  gap: 8px;
  background-color: var(--gray-100);
  border-radius: 16px;
  padding: 6px 12px;
  font-size: 16px;
`;

const DeleteButton = styled.button`
  background-color: var(--gray-400);
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  cursor: pointer;
`;

export const TagChip = ({ tags, onDelete }) => {
  const handleDeleteClick = (e, index) => {
    e.preventDefault();
    onDelete(index);
  };

  return (
    <div className="TagChip">
      {tags.map((tag, index) => (
        <Chip key={index}>
          #{tag}
          <DeleteButton onClick={(e) => handleDeleteClick(e, index)}>
            <img src={ic_imgdel} alt="del" width="8" />
          </DeleteButton>
        </Chip>
      ))}
    </div>
  );
};
