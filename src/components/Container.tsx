import { useEffect, useRef, useState } from "react";

interface Props {
  currentOrder: string;
  onOrderChange: (newOrderBy: string) => void;
}

const Container = ({ currentOrder, onOrderChange }: Props) => {
  const dropDownRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const className = `option-order ${isOpen ? "active" : undefined}`;

  const handleOrderClick = (order: string) => {
    onOrderChange(order);
    setIsOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node))
      setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
