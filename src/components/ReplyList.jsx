import { useEffect, useState } from "react";
import { getReplyById } from "../api";
import styles from "../components/styles/ReplyList.module.css";
import { Kebab } from "./Kebab";
import { Dropdown } from "./Dropdown";

function Reply({ replies }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleKebabClick = (e) => {
    setIsOpen(true);
  };

  return (
    <>
      {replies.length > 0 ? (
        <div className={styles.replyItem}>
          <div className={styles.replyContent}>
            {replies.content}
            <Kebab />
            <Dropdown
              className={`${isOpen ? "" : styles.hidden}`}
              onClick={handleKebabClick}
            />
          </div>

          <div className={styles.replyWriter}>
            <div className={styles.sellerProfile}></div>
            <div className={styles.replayWriterInfo}>
              <div className={styles.replyNickname}>{replies.nickname}</div>
              <div className={styles.replyCreatedAt}>{replies.createdAt}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.replyItem}>
          <div>
            <div className={styles.replyContent}>
              {replies.content}테스트용 댓글입니다.
              <Kebab />
              <Dropdown />
            </div>
          </div>
          <div className={styles.replyWriter}>
            <div className={styles.sellerProfile}></div>
            <div className={styles.replayWriterInfo}>
              <div className={styles.replyNickname}>
                {replies.nickname}테스트용 판다
              </div>
              <div className={styles.replyCreatedAt}>
                {replies.createdAt}1시간전
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function ReplyList({ id, limit, cursor }) {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadReplyList = async () => {
    setLoading(true);
    try {
      const replyList = await getReplyById({ id, limit, cursor });
      setReplies(replyList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      console.log(replies);
    }
  };

  useEffect(() => {
    loadReplyList();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Reply replies={replies} />
      <Reply replies={replies} />
      <Reply replies={replies} />
    </>
  );
}
