import { useEffect, useState, useRef, useCallback } from "react";
import PostItem from "./PostItem";
import styles from "./Posts.module.css";
import axios from "@/lib/axios";
import Button from "@/components/Button";
import { ClipLoader } from "react-spinners";

const PAGE_SIZE = 5;

function Posts({ initialPosts }) {
  const [order, setOrder] = useState("recent");
  const [posts, setPosts] = useState(initialPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const observerRef = useRef();

  const handleChange = (e) => {
    setOrder(e.target.value);
    setPage(1);
    setError(null);
  };

  const fetchPosts = async (orderQuery, pageQuery = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `/articles?page=${pageQuery}&pageSize=${PAGE_SIZE}&orderBy=${orderQuery}`
      );
      return res.data.list ?? [];
    } catch (error) {
      console.error(error);
      const errorMessage =
        pageQuery === 1
          ? "초기 데이터를 불러오는데 실패했습니다."
          : "추가 데이터를 불러오는데 실패했습니다.";
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const loadMore = useCallback(async () => {
    if (loading) return;
    const fetchedPosts = await fetchPosts(order, page);
    setPosts((prevPosts) => [...prevPosts, ...fetchedPosts]);
    setPage((prevPage) => prevPage + 1);
  }, [order, page, loading]);

  const getPosts = async () => {
    const fetchedPosts = await fetchPosts(order);
    setPosts(fetchedPosts);
    setPage(2);
  };

  useEffect(() => {
    getPosts();
  }, [order]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loadMore]);

  return (
    <div>
      <div className={styles.postsHeader}>
        <h2 className={styles.headerTitle}>게시글</h2>
        <Button width="88px">글쓰기</Button>
      </div>
      <form className={styles.postsForm}>
        <input
          type="text"
          className={styles.postsInput}
          placeholder="검색할 상품을 입력해주세요"
        />
        <select onChange={handleChange} className={styles.postsSelect}>
          <option value="recent">최신 순</option>
          <option value="like">좋아요 순</option>
        </select>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {!error && (
        <ul className={styles.postList}>
          {posts.map((post, index) => (
            <li key={post.id}>
              <PostItem
                post={post}
                ref={index === posts.length - 1 ? observerRef : null}
              />
            </li>
          ))}
        </ul>
      )}
      {loading && (
        <div className={styles.loading}>
          <ClipLoader color="#3692FF" />
        </div>
      )}
    </div>
  );
}

export default Posts;
