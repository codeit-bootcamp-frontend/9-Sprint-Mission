import { useRef } from "react";
import useDetectClose from "../hooks/useDetectClose";

const Container = ({ currentOrder, onOrderChange }) => {
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

  const className = `option-order ${isOpen ? "active" : undefined}`;
  const handleOrderClick = (order) => {
    onOrderChange(order);
    setIsOpen(false);
  };
  return (
    <div className="select-order">
      <button
        type="button"
        className="current-order"
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentOrder === "recent" ? "최신순" : "좋아요순"}
      </button>
      <div className={className}>
        <ul ref={dropDownRef}>
          <li>
            <button type="button" onClick={() => handleOrderClick("recent")}>
              최신순
            </button>
          </li>
          <li>
            <button type="button" onClick={() => handleOrderClick("favorite")}>
              좋아요순
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Container;
