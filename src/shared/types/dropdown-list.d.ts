// SORT_TYPE을 사용한 SortOption 인터페이스 수정
export interface SortOption {
  label: string;
  value: (typeof SORT_TYPE)[keyof typeof SORT_TYPE];
}

// DropdownListProps 수정
export interface DropdownListProps {
  sortOptions: SortOption[];
  onSortSelection: (value: (typeof SORT_TYPE)[keyof typeof SORT_TYPE]) => void;
}
