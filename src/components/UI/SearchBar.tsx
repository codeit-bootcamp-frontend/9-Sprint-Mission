import SearchIcon from "@/images/icons/ic_search.svg";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
      <SearchIcon alt="검색" />
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
