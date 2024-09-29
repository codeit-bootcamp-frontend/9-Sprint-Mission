import Image from "next/image";
import searchIcon from "@/assets/images/icons/ic_search.svg";
import { useQuery } from "@/context/QueryContext";
import { useState } from "react";
import S from "./SearchInput.style";

export default function SearchInput() {
  const [value, setValue] = useState("");
  const { setQuery } = useQuery();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    setQuery((prev) => ({
      ...prev,
      keyword: newValue,
    }));
  };

  return (
    <S.Container>
      <S.ImageWrap>
        <Image src={searchIcon} alt="Search Icon" width={20} height={20} />
      </S.ImageWrap>
      <S.Input
        value={value}
        onChange={handleChange}
        placeholder="검색어를 입력해주세요."
      />
    </S.Container>
  );
}
