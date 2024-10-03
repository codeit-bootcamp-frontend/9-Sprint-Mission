// src/components/UI/SearchBar.tsx
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// public 폴더 경로 문자열로 대체
const SearchIcon = "/images/icons/ic_search.png";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
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

  useEffect(() => {
    const currentKeyword = (router.query.q as string) || "";
    setKeyword(currentKeyword);
  }, [router.query.q]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(keyword);
    }
  };

  return (
    <div
      className={`flex items-center bg-gray-100 rounded-xl p-2 flex-1 ${className}`}
    >
      <Image src={SearchIcon} width={24} height={24} alt="검색 아이콘" />
      <input
        className="border-none flex-1 bg-inherit ml-1 placeholder-gray-400 text-base focus:outline-none"
        value={keyword}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
