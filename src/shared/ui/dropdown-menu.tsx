import "./dropdown-menu.css";
import { DropdownMenuProps } from "../types/dropdown-menu";

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, onItemClick }) => {
  return (
    <div className="dropdown-menu">
      {items.map((item, index) => (
        <a
          key={index}
          href="#"
          className="dropdown-item"
          onClick={(e) => {
            e.preventDefault();
            onItemClick(item);
          }}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
};

export default DropdownMenu;
