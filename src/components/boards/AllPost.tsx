import Dropdown from "@/src/components/UI/Dropdown";
import SearchInput from "@/src/components/UI/SearchInput";
import Pagination from "@/src/components/UI/Pagination";
import PostCard from "./AllPostItem";
import axios from "@/src/lib/axios";
import styles from "@/src/components/boards/AllPost.module.css";
import { useEffect, useState } from "react";
import { PostsProps, GetQuery } from "@/src/types";

const PAGE_SIZE = 10;

export default function AllPost({ posts: initialPosts, q }: PostsProps) {
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState(initialPosts);
  const [totalPageNum, setTotalPageNum] = useState();

  const fetchPosts = async ({ orderBy, page, q }: GetQuery) => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("page", String(page));
      queryParams.append("pageSize", String(PAGE_SIZE));
      queryParams.append("orderBy", orderBy);

      // q가 null, undefined, 빈 문자열이 아닐 경우에만 keyword 파라미터 추가
      if (typeof q === "string" && q.trim() !== "") {
        queryParams.append("keyword", q);
      }

      const res = await axios.get(`/articles?${queryParams.toString()}`);
      setPosts(res.data.list);
      // setTotalPageNum(Math.ceil(res.data.totalCount / PAGE_SIZE));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts({ orderBy, page, q });
  }, [page, orderBy, q]);

  const handleSortChange = (sortOption: string) => {
    setOrderBy(sortOption);
  };

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <strong className={styles.sectionTitle}>게시글</strong>
        <button className={styles.writeButton} type="button">
          글쓰기
        </button>
      </div>
      <div className={styles.searchContainer}>
        <SearchInput q={q} />
        <Dropdown onChange={handleSortChange} />
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
      <Pagination />
    </div>
  );
}
