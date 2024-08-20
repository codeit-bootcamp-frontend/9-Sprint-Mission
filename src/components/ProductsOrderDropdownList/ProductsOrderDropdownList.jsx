import React from "react";
import "./ProductsOrderDropdownList.css";

function ProductsOrderDropdownList({ onSortSelection }) {
  return (
    <div className="dropdownList">
      <div className="dropdownItem" onClick={() => onSortSelection("recent")}>
        최신순
      </div>
      <div className="dropdownItem" onClick={() => onSortSelection("favorite")}>
        인기순
      </div>
    </div>
  );
}
export default ProductsOrderDropdownList;
