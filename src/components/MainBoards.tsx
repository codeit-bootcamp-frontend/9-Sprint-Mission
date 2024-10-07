import { useEffect, useMemo, useState } from "react";
import { Board } from "../types/types";
import { formatDate } from "../utils/dateUtils";
import Link from "next/link";
import Image from "next/image";
import axios from "@/src/lib/axios";
import userIcon from "@/public/assets/icon/user-icon.png";
import Pagination from "./features/Pagination";
import SearchForm from "./features/SearchForm";
import DropdownMenu from "./features/DropdownMenu";
import styles from "./AllBoardList.module.scss";

interface ProductProps {
  initialProducts: Board[];
  total: number;
}

const PAGE_SIZE = 10;

export default function MainBoard({ initialProducts, total }: ProductProps) {
  const [posts, setPosts] = useState<Board[]>(initialProducts || []);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("recent");

  const fetchPosts = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const res = await axios.get<{ list: Board[] }>("/articles", {
        params: {
          page: 1,
          pageSize: total,
          orderBy: sortOrder,
          q: searchQuery,
        },
      });

      setPosts(res.data.list);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query); // 검색어 업데이트
    setCurrentPage(1); // 검색 시 페이지 번호 초기화
  };

  // 전체 게시글을 한 번만 가져옴
  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) =>
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [posts, searchQuery]
  );

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredPosts.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredPosts, currentPage]);

  return (
    <div className={styles.article}>
      <h2 className="page-title">
        게시글
        <button className="btn-box" type="button">
          <Link href="/addboard">글쓰기 </Link>
        </button>
      </h2>
      <div className={styles["filter-section"]}>
        <SearchForm onSearch={handleSearch} />
        <DropdownMenu setSortOrder={setSortOrder} />
      </div>
      <ul className={styles["article-wrap"]}>
        {paginatedPosts &&
          paginatedPosts.map((post) => (
            <li className={styles["article-list"]} key={post.id}>
              <div>
                <div className={styles.content}>
                  <Link href={`/boards/${post.id}`}>{post.content}</Link>
                </div>
                <div className={styles["profile-img"]}>
                  <Image
                    src={post.image}
                    width={72}
                    height={72}
                    alt="작성자 이미지"
                  />
                </div>
              </div>
              <div>
                <div className={styles["user-info"]}>
                  <span className={styles["user-img"]}>
                    <Image
                      src={userIcon}
                      width={24}
                      height={24}
                      alt="사용자 이미지"
                    />
                  </span>
                  <span className={styles.nickname}>
                    {post.writer.nickname}
                  </span>
                  <span className={styles.date}>
                    {formatDate(post.createdAt)}
                  </span>
                </div>
                <div className={styles.like}>
                  <button>{post.likeCount}</button>
                </div>
              </div>
            </li>
          ))}
      </ul>
      <Pagination
        total={Math.ceil(filteredPosts.length / PAGE_SIZE)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
