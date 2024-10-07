import Image from "next/image";
import styles from "./CommentList.module.css";
import { useCallback, useRef, useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { BounceLoader } from "react-spinners";
import { Post } from "@/types/types";
import { timeAgoFormat } from "@/utils/timeAgoFormat";

function CommentListItem({ item }: { item: Post }) {
  return (
    <div className={styles.commentListItem}>
      <div className={styles.commentListTop}>
        <p>{item.content}</p>
        <Image src="/images/dropdown.svg" alt="옵션" width="24" height="24" />
      </div>
      <div className={styles.profileBox}>
        <Image src="/images/profile.svg" alt="프로필" width="32" height="32" />
        <div className={styles.profileBoxRight}>
          <span className={styles.profileNickName}>{item.writer.nickname}</span>
          <span className={styles.profileTime}>
            {timeAgoFormat(item.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

function CommentList({
  comments,
  nextCursor,
}: {
  comments: Post[];
  nextCursor: string | null;
}) {
  const [items, setItems] = useState(comments);
  const [cursor, setCursor] = useState(nextCursor);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef(null);
  const router = useRouter();
  const id = router.query.id;

  const loadMore = useCallback(async () => {
    if (!cursor || isLoading) return;
    setIsLoading(true);
    try {
      const res = await axios.get(
        `/articles/${id}/comments?limit=10&cursor=${cursor}`
      );
      setItems((prevItems) => [...prevItems, ...res.data.list]);
      setCursor(res.data.nextCursor);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [cursor, id, isLoading]);

  const commentRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, loadMore]
  );

  return (
    <div>
      {items && items.length > 0 ? (
        <ul className={styles.commentList}>
          {items.map((item, index) => {
            if (index === items.length - 1) {
              return (
                <li key={item.id} ref={commentRef}>
                  <CommentListItem item={item} />
                </li>
              );
            } else {
              return (
                <li key={item.id}>
                  <CommentListItem item={item} />
                </li>
              );
            }
          })}
        </ul>
      ) : (
        <div className={styles.emptyCommentBox}>
          <Image
            src="/images/empty_comment.svg"
            alt="댓글 없음"
            width="140"
            height="140"
          />
          <p>
            아직 댓글이 없어요, <br />
            지금 댓글을 달아보세요!
          </p>
        </div>
      )}
      {isLoading && <BounceLoader color="#36d7b7" />}
    </div>
  );
}

export default CommentList;
