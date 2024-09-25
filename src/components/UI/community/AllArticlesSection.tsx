import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import SearchBar from "@/components/UI/SearchBar";
import DropdownMenu from "@/components/UI/DropdownMenu";
import LikeCountDisplay from "@/components/UI/LikeCountDisplay";
import EmptyState from "@/components/UI/EmptyState";
import { Article, ArticleSortOption } from "@/types/article";
import { getArticles } from "@/api/article";

interface ArticleItemProps {
  article: Article;
}

const ArticleItem = ({ article }: ArticleItemProps) => {
  const dateString = format(article.createdAt, "yyyy. MM. dd");
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const validateAndSetImageUrl = async (url: string) => {
      if (url.includes("sprint-fe-project.s3.ap-northeast-2.amazonaws.com")) {
        setImageUrl(url);
      } else {
        try {
          const response = await fetch(
            `/api/imageProxy?url=${encodeURIComponent(url)}`
          );
          if (response.ok) {
            setImageUrl(`/api/imageProxy?url=${encodeURIComponent(url)}`);
          } else {
            console.log("이미지를 불러올 수 없습니다: ", response.status);
            setImageUrl("/path/to/fallback/image.jpg"); // 대체 이미지 경로를 지정해주세요
          }
        } catch (error) {
          console.error("이미지를 불러올 수 없습니다: ", error);
          setImageUrl("/path/to/fallback/image.jpg"); // 대체 이미지 경로를 지정해주세요
        }
      }
    };

    if (article.image) {
      validateAndSetImageUrl(article.image);
    }
  }, [article.image]);

  return (
    <>
      <Link href={`/boards/${article.id}`} className="block">
        <div className="flex gap-2 min-h-[72px]">
          <div className="text-lg font-semibold flex-1 md:text-xl">
            {article.title}
          </div>
          {imageUrl && (
            <div className="bg-white border border-gray-200 w-[72px] h-[72px] rounded-lg p-3">
              <div className="relative w-full h-full">
                <Image
                  fill
                  src={imageUrl}
                  alt={`${article.id}번 게시글 이미지`}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            {article.writer.nickname}{" "}
            <span className="text-gray-400">{dateString}</span>
          </div>

          <LikeCountDisplay count={article.likeCount} iconWidth={24} gap={8} />
        </div>
      </Link>

      <hr className="my-6 border-t border-gray-200" />
    </>
  );
};

interface AllArticlesSectionProps {
  initialArticles: Article[];
}

const AllArticlesSection = ({ initialArticles }: AllArticlesSectionProps) => {
  const [orderBy, setOrderBy] = useState<ArticleSortOption>("recent");
  const [articles, setArticles] = useState(initialArticles);

  const router = useRouter();
  const keyword = (router.query.q as string) || "";

  const handleSortSelection = (sortOption: ArticleSortOption) => {
    setOrderBy(sortOption);
  };

  const handleSearch = (searchKeyword: string) => {
    const query = { ...router.query };
    if (searchKeyword.trim()) {
      query.q = searchKeyword;
    } else {
      delete query.q;
    }
    router.replace({
      pathname: router.pathname,
      query,
    });
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const params: { orderBy: ArticleSortOption; keyword?: string } = {
          orderBy,
        };
        if (keyword.trim()) {
          params.keyword = keyword;
        }
        const data = await getArticles(params);
        setArticles(data.list);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    fetchArticles();
  }, [orderBy, keyword]);

  return (
    <div className="mt-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold text-gray-800">게시글</div>
        <Link
          href="/addArticle"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-blue-600"
        >
          글쓰기
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <SearchBar onSearch={handleSearch} className="w-full md:w-96" />
        <DropdownMenu<ArticleSortOption>
          onSortSelection={(sortOption) => handleSortSelection(sortOption)}
          type="article"
        />
      </div>

      <div className="space-y-6">
        {articles.length
          ? articles.map((article) => (
              <ArticleItem key={`article-${article.id}`} article={article} />
            ))
          : keyword && (
              <EmptyState text={`'${keyword}'로 검색된 결과가 없어요.`} />
            )}
      </div>
    </div>
  );
};

export default AllArticlesSection;
