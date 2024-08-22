import { useState, useRef } from "react";
import "./Tag.css";
import Tagitem from "./Tagitem/Tagitem";

function Tag({ className, values = [], onChange }) {
  const isRef = useRef(1);
  const [items, setItems] = useState(values);
  const [tag, setTag] = useState("");

  const handleChange = (e) => {
    setTag(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && tag !== "") {
      e.preventDefault();
      const newTag = { id: isRef.current++, value: tag };
      const updatedItems = [...items, newTag];

      setItems(updatedItems);
      onChange(updatedItems);

      setTag("");
    }
  };

  const handleTagDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    onChange(updatedItems);
  };

  return (
    <>
      <input
        name="tag"
        type="text"
        placeholder="태그를 입력해주세요"
        className={className}
        value={tag}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <ul className="Taglist">
        {items.map((item) => (
          <li key={item.id}>
            <Tagitem item={item} onDelete={handleTagDelete} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Tag;
