import "./dropdown-list.css";
import { DropdownListProps } from "../types/dropdown-list";

function DropdownList({ sortOptions, onSortSelection }: DropdownListProps) {
  return (
    <div className="dropdownList">
      {sortOptions.map((option) => (
        <div
          key={option.value}
          className="dropdownItem"
          onClick={() => onSortSelection(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
}

export default DropdownList;
