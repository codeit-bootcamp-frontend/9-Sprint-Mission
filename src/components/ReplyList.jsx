import { useEffect, useState } from "react";
import { getReplyById } from "../api";
import styles from "../components/styles/ReplyList.module.css";
import { Kebab } from "./Kebab";
import { Dropdown } from "./Dropdown";
import { formatDate } from "../utils/formDate";
import { getHoursDiff } from "../utils/diffDate";

export function ReplyList({ id, limit, cursor }) {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadReplyList = async () => {
    setLoading(true);
    try {
      const replyObj = await getReplyById({ id, limit });
      const replyList = replyObj.list;
      setReplies(replyList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReplyList();
  }, [id, limit]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.repliesWrapper}>
      {replies.map((reply, index) => (
        <Reply key={index} reply={reply} />
      ))}
    </div>
  );
}

// 개별 reply 컴포넌트
function Reply({ reply }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleKebabClick = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
  // 댓글 작성 시간
  const replyTime = () => {
    const diffHr = getHoursDiff(reply.createdAt);

    if (diffHr <= 24) {
      return `${diffHr}시간 전`;
    }
    return formatDate(reply.createdAt);
  };

  useEffect(() => {}, [reply]);

  return (
    <>
      {reply ? (
        <div className={styles.replyItem}>
          <div className={styles.replyContent}>
            {reply.content}
            <Kebab onClick={handleKebabClick} />
            <Dropdown isOpen={isOpen} />
          </div>

          <div className={styles.replyWriter}>
            <div className={styles.sellerProfile}>
              <img
                src={reply.writer.image}
                alt="댓글 작성자 프로필 이미지"
                width="32"
                height="32"
              />
            </div>
            <div className={styles.replayWriterInfo}>
              <div className={styles.replyNickname}>
                {reply.writer.nickname}
              </div>
              <div className={styles.replyCreatedAt}>{replyTime()}</div>
            </div>
          </div>
        </div>
      ) : (
        <div>등록된 댓글이 없습니다.</div>
      )}
    </>
  );
}
