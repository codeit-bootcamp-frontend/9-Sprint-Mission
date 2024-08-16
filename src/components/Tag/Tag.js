import { useState, useRef } from "react";
import "./Tag.css";
import XImg from "../../assets/X.svg";

function Tagitems({ item }) {
  // const handleDeleteClick = () => {
  //   onDelete(item.id);
  // };

  return (
    <div className="Tagitems">
      <span>#{item.value}</span>
      <button className="Tagitems-button">
        <img src={XImg} alt="취소" width="20" height="20" />
      </button>
    </div>
  );
}

function Tag({ name, className, values = [], onChange }) {
  const isRef = useRef(0);
  const [items, setItems] = useState(values);
  const [tag, setTag] = useState("");

  const handleChange = (e) => {
    setTag(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && tag.trim() !== "") {
      const newTag = { id: isRef.current++, value: tag };
      setItems((prevItems) => {
        const updatedItems = [...prevItems, newTag];
        onChange(name, [...updatedItems]);
        return [...updatedItems];
      });
      setTag("");
    }
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
            <Tagitems item={item} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Tag;
