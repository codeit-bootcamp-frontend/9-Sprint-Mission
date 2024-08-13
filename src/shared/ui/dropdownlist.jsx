import React from "react";
import { SORT_TYPE } from "../../entities/item/lib/usePageSize";
import "./dropdownList.css";

function DropdownList({ onSortSelection }) {
  return (
    <div className="dropdownList">
      <div
        className="dropdownItem"
        onClick={() => onSortSelection(SORT_TYPE.recent)}
      >
        최신순
      </div>
      <div
        className="dropdownItem"
        onClick={() => onSortSelection(SORT_TYPE.favorite)}
      >
        인기순
      </div>
    </div>
  );
}
export default DropdownList;
