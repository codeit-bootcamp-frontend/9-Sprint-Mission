import { useState } from "react";
import { useRouter } from "next/router";
import { Option } from "@/types/dropdown";
import DropdownButton from "./DropdownButton";
import DropdownMenu from "./DropdownMenu";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null); // 선택된 옵션 상태 추가
  const router = useRouter();

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
    // 쿼리 파라미터를 업데이트하여 페이지를 다시 요청
    router.push({
      pathname: router.pathname, // 현재 경로 유지
      query: { orderBy: option.value }, // 쿼리 파라미터 설정
    });
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
