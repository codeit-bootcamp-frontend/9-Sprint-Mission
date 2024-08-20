import "./dropdown-list.css";

function DropdownList({ sortOptions, onSortSelection }) {
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
