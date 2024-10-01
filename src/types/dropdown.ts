export interface Option {
  value: string;
  label: string;
}

export interface DropdownButtonProps {
  onClick: () => void;
  isOpen: boolean;
  selectedLabel: string;
}

export interface DropdownMenuProps {
  options: Option[];
  onSelect: (option: Option) => void;
}
