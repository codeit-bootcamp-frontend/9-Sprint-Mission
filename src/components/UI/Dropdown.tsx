import React from "react";
import styles from "./Dropdown.module.css";

interface DropdownProps {
  onChange: (sortOption: string) => void;
}

export default function Dropdown({ onChange }: DropdownProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select className={styles.dropdownForm} onChange={handleChange}>
      <option value="recent">최신순</option>
      <option value="like">좋아요순</option>
    </select>
  );
}
