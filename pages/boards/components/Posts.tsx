import { useEffect, useState, useCallback } from "react";
import PostItem from "./PostItem";
import styles from "./Posts.module.css";
import axios from "@/lib/axios";
import Button from "@/components/Button";
import { ClipLoader } from "react-spinners";
import Pagination from "@/components/Pagination";
import { Post } from "@/types/types";
import { useRouter } from "next/router";

const PAGE_SIZE = 10;
const PAGE_LIMIT = 5;
const DEBOUNCE_DELAY = 300; // 디바운스 딜레이 설정

interface PostsProps {
  initialPosts: Post[];
  total: number;
}

function Posts({ initialPosts = [], total }: PostsProps) {
  const router = useRouter();
  const [order, setOrder] = useState<string>("recent");
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState<number>(1);
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  // 검색 입력 처리
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  // 검색어가 바뀔 때마다 300ms 후에 실제 검색 상태를 업데이트
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, DEBOUNCE_DELAY);

    // cleanup: 타이핑 중이면 이전 타이머를 지움
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value);
    setPage(1);
    setError(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const fetchPosts = async (orderQuery: string, pageQuery: number) => {
    setLoading(true);
    setError(null);
    let res;

    try {
      res = await axios.get(
        `/articles?page=${pageQuery}&pageSize=${PAGE_SIZE}&orderBy=${orderQuery}`
      );
      setPosts(Array.isArray(res.data.list) ? res.data.list : []);
    } catch (err) {
      console.error(err);
      setError("게시글을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const getPosts = useCallback(() => {
    fetchPosts(order, page);
  }, [order, page]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // debouncedSearch 값이 바뀔 때만 필터링
  const filteredPosts = debouncedSearch
    ? Array.isArray(posts)
      ? posts.filter((post) =>
          post.content?.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
      : []
    : posts;

  return (
    <div>
      <div className={styles.postsHeader}>
        <h2 className={styles.headerTitle}>게시글</h2>
        <Button
          onClick={() => {
            router.push("/addboard");
          }}
          width="88px"
        >
          글쓰기
        </Button>
      </div>
      <form className={styles.postsForm}>
        <input
          type="text"
          value={search}
          className={styles.postsInput}
          placeholder="검색할 상품을 입력해주세요"
          onChange={handleSearchChange}
        />
        <select onChange={handleChange} className={styles.postsSelect}>
          <option value="recent">최신 순</option>
          <option value="like">좋아요 순</option>
        </select>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {loading && (
        <div className={styles.loading}>
          <ClipLoader color="#3692FF" />
        </div>
      )}
      {!error && (
        <ul className={styles.postList}>
          {filteredPosts.map((post) => (
            <li key={post.id}>
              <PostItem post={post} />
            </li>
          ))}
        </ul>
      )}
      <Pagination
        page={page}
        total={totalPages}
        pageLimit={PAGE_LIMIT}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Posts;
