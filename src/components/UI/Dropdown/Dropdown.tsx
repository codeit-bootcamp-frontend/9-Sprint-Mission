import { useState } from "react";
import { Option } from "@/types/dropdown";
import DropdownButton from "./DropdownButton";
import DropdownMenu from "./DropdownMenu";
import { useQuery } from "@/context/QueryContext";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null); // 선택된 옵션 상태 추가
  const { setQuery } = useQuery(); // query 업데이트 함수 가져오기

  const options: Option[] = [
    { value: "recent", label: "최신순" },
    { value: "like", label: "좋아요순" },
  ];

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: Option): void => {
    setSelectedOption(option); // 선택된 옵션 업데이트
    setIsOpen(false); // 선택 후 Dropdown 닫기
    setQuery((prev) => ({ ...prev, orderBy: `${option.value}` })); //dropdown 선택하는 query값으로 ArticleList 업데이트
  };

  return (
    <div>
      <DropdownButton
        isOpen={isOpen}
        onClick={toggleDropdown}
        selectedLabel={selectedOption ? selectedOption.label : "최신순"} // 버튼에 선택된 옵션의 라벨 전달
      />
      {isOpen && <DropdownMenu options={options} onSelect={handleSelect} />}
    </div>
  );
}
