export interface SortOption {
  label: string;
  value: string | number;
}

export interface DropdownListProps {
  sortOptions: SortOption[];
  onSortSelection: (value: string | number) => void;
}
