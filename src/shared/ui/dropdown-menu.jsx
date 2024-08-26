import "./dropdown-menu.css";

const DropdownMenu = ({ items, onItemClick }) => {
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
