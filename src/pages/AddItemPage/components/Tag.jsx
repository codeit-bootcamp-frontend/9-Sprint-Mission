import { useRef, useState } from "react";
import TagItem from "./TagItem";
import styled from "styled-components";

function Tag({ className, values = [], onChange }) {
  const isRef = useRef(values.length + 1);
  const [tag, setTag] = useState("");

  const handleChange = (e) => {
    setTag(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && tag !== "") {
      e.preventDefault();
      const newTag = { id: isRef.current++, value: tag };
      const updatedItems = [...values, newTag];

      onChange(updatedItems);
      setTag("");
    }
  };

  const handleTagDelete = (id) => {
    const updatedItems = values.filter((item) => item.id !== id);
    onChange(updatedItems); // 상태 대신 onChange로 전달
  };

  return (
    <>
      <TagInput
        name="tag"
        type="text"
        placeholder="태그를 입력해주세요"
        className={className}
        value={tag}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <TagList>
        {values.map((item) => (
          <TagListItem key={item.id}>
            <TagItem
              item={item}
              isDelete={true}
              onDelete={() => handleTagDelete(item.id)}
            />
          </TagListItem>
        ))}
      </TagList>
    </>
  );
}

export default Tag;

const TagInput = styled.input`
  width: 100%;
  padding: 16px 24px;
  border-radius: 12px;
  background-color: rgba(243, 244, 246, 1);
  border: none;

  &::placeholder {
    font-size: 16px;
    font-weight: 400;
    color: rgba(156, 163, 175, 1);
  }
`;

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: 14px;
  margin-bottom: 0px;
  padding: 0;
  gap: 12px;
`;

const TagListItem = styled.li`
  list-style-type: none;
`;
