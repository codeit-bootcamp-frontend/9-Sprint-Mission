import styled from "styled-components";
import resetImg from "../../../assets/images/icon/ic_reset.svg";

export const TagStyle = styled.ul`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const TagName = styled.li`
  font-size: 16px;
  font-weight: 400;
  border-radius: 26px;
  background-color: #f3f4f6;
  color: #1f2937;
  padding: 6px 12px;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Tag = ({ tags, handleTagDelete }) => {
  return (
    <TagStyle>
      {/* map () 괄호 주의하기 / {} 중괄호 return 으로 반환 */}
      {tags.map((tag) => (
        <TagName key={tag}>
          {`#${tag}`}
          <button onClick={() => handleTagDelete(tag)}>
            <img src={resetImg} alt="선택해제" />
          </button>
        </TagName>
      ))}
    </TagStyle>
  );
};

export default Tag;
