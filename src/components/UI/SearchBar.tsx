// src/components/UI/SearchBar.tsx
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// public 폴더 경로 문자열로 대체
const SEARCH_ICON = "/images/icons/ic_search.png";

interface SearchBarProps {
  onSearch: (keyword: string) => void; // 검색어 변경 시 호출되는 함수
  placeholder?: string;
  className?: string;
}

const SearchBar = ({
  onSearch,
  placeholder = "검색할 키워드를 입력해 주세요",
  className = "",
}: SearchBarProps) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  // 현재 라우터 쿼리에서 검색어를 불러와 초기화
  useEffect(() => {
    const currentKeyword = (router.query.q as string) || "";
    setKeyword(currentKeyword);
  }, [router.query.q]);

  // 입력값이 변경되면 검색어 상태를 업데이트하고, 검색 함수 호출
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);
    onSearch(newKeyword); // 검색어 변경 시 바로 전달
  };

  return (
    <div
      className={`flex items-center bg-gray-100 rounded-xl p-2 flex-1 ${className}`}
    >
      <Image src={SEARCH_ICON} width={24} height={24} alt="검색 아이콘" />
      <input
        className="border-none flex-1 bg-inherit ml-1 placeholder-gray-400 text-base focus:outline-none"
        value={keyword}
        onChange={handleInputChange} // onChange에서 검색어 상태 반영
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
