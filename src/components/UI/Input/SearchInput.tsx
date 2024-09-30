import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import searchIcon from "@/assets/images/icons/ic_search.svg";
import S from "./SearchInput.style";

export default function SearchInput() {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const currentQuery = { ...router.query };
    setValue(newValue);

    // router.push => 사용자가 입력한 검색어를 쿼리 파라미터로 URP에 추가하고 새로고침 없이 이동하는 기능
    router.push({
      pathname: router.pathname, // 같은 페이지에 머무르면서 쿼리 파라미터로만 이동하게 동작.
      query: { ...currentQuery, keyword: newValue }, // 기존에 쿼리 파라미터를 유지한 채, 사용자가 입력한 값으로 새로운 쿼리 파라미터를 추가
    });
  };

  return (
    <S.Container>
      <S.ImageWrap>
        <Image src={searchIcon} alt="Search Icon" width={24} height={24} />
      </S.ImageWrap>
      <S.Input
        value={value}
        onChange={handleChange}
        placeholder="검색어를 입력해주세요."
      />
    </S.Container>
  );
}
