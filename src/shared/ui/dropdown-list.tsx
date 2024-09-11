import "./dropdown-list.css";

function DropdownList({ sortOptions, onSortSelection }: any) {
  return (
    <div className="dropdownList">
      {sortOptions.map((option: any) => (
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
