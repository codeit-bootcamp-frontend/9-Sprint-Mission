import { useRef, useState, KeyboardEvent, ChangeEvent } from "react";
import TagItem from "./TagItem";
import styled from "styled-components";

export interface TagType {
  id: number;
  value: string;
}

interface TagProps {
  name?: string;
  className?: string;
  values?: TagType[];
  onChange: (updatedTags: TagType[]) => void;
}

function Tag({ className, values = [], onChange }: TagProps) {
  const isRef = useRef<number>(values.length + 1);
  const [tag, setTag] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tag !== "") {
      e.preventDefault();
      const newTag: { id: number; value: string } = {
        id: isRef.current++,
        value: tag,
      };
      const updatedItems = [...values, newTag];

      onChange(updatedItems);
      setTag("");
    }
  };

  const handleTagDelete = (id: number) => {
    const updatedItems = values.filter((item) => item.id !== id);
    onChange(updatedItems);
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
