// src/components/UI/InputItem.tsx
import React from "react";
import { KeyboardEvent, useState } from "react";
import InputItem from "./InputItem";
import DeleteButton from "./DeleteButton";

interface TagInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

const TagInput = ({ tags, onAddTag, onRemoveTag }: TagInputProps) => {
  const [input, setInput] = useState("");

  const onPressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;

    const inputString = input.trim();
    if (event.key === "Enter" && inputString) {
      event.preventDefault();
      onAddTag(inputString);
      setInput("");
    }
  };

  return (
    <div>
      <InputItem
        id="tags"
        label="태그"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onPressEnter}
        placeholder="태그를 입력해 주세요"
      />

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-3">
          {tags.map((tag) => (
            <div
              key={`tag-${tag}`}
              className="flex items-center bg-gray-50 text-gray-800 px-4 py-3.5 rounded-full min-w-[100px]"
            >
              <span className="text-base leading-6 mr-2 max-w-[calc(100%-28px)] overflow-hidden text-ellipsis whitespace-nowrap">
                {tag}
              </span>

              <DeleteButton
                onClick={() => onRemoveTag(tag)}
                label={`${tag} 태그`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;
