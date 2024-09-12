export interface DropdownMenuItem {
  label: string;
  value: any; // 선택적으로 사용될 수 있는 데이터 타입
}

export interface DropdownMenuProps {
  items: DropdownMenuItem[];
  onItemClick: (item: DropdownMenuItem) => void;
}
