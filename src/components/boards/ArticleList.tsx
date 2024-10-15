import styled from "styled-components";
import Dropdown from "../ui/dropdown/Dropdown";
import NewArticleButton from "../ui/button/WriteButton";
import SearchInput from "../ui/input/SearchInput";
import ArticleItem from "./ArticleItem";
import { Article, ArticleListProps } from "@/types/articles";
import { useRouter } from "next/router";

export function ArticleList({ articles }: ArticleListProps) {
  const router = useRouter();

  const handleNavigate = (id: number) => {
    router.push(`/boards/${id}`);
  };

  return (
    <div>
      <TitleSection>
        <Title>게시글</Title>
        <NewArticleButton />
      </TitleSection>
      <SearchSection>
        <SearchInput />
        <Dropdown />
      </SearchSection>
      <ListSection>
        {articles.map((article: Article | null) => {
          if (!article) return null;
          return (
            <ArticleItem
              key={article.id}
              article={article}
              onClick={() => handleNavigate(article.id)}
            />
          );
        })}
      </ListSection>
    </div>
  );
}

// 스타일 컴포넌트
const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  height: 42px;
`;

const SearchSection = styled.div`
  display: flex;
  gap: 13px;
  justify-content: space-between;
  height: 42px;
  margin-top: 24px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    margin-top: 48px;
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    margin-top: 16px;
  }
`;

const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
`;
