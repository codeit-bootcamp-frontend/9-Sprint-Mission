import React from "react";

interface TagDisplayProps {
  tags: string[];
}

const TagDisplay = ({ tags }: TagDisplayProps) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag, index) => (
        <div
          key={`tag-display-${index}`}
          className="bg-gray-50 text-gray-800 px-4 py-1.5 rounded-full text-base"
        >
          #{tag}
        </div>
      ))}
    </div>
  );
};

export default TagDisplay;
