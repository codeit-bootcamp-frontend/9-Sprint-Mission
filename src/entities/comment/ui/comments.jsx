import { useEffect, useState } from "react";
import { getProductComments } from "../../../shared/api/comments/comments";

const COMMENT_LIMIT = 10;

function CommentsSection({ productId }) {
  const [comments, setComments] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    const fetchComments = async () => {
      setIsLoading(true);
      const params = {
        limit: COMMENT_LIMIT,
        nextCursor: nextCursor,
      };

      try {
        const data = await getProductComments({ productId, params });
        setComments((prevComments) => {
          return nextCursor ? [...prevComments, ...data.list] : data.list;
        });
        setNextCursor(data.nextCursor);
        setError(null);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("상품의 댓글을 불러오지 못했어요.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [productId, nextCursor]);

  if (isLoading) {
    return <div>상품 댓글 로딩중...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }

  return (
    <div className="comments-section">
      <div className="comment-title">문의하기</div>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-user">{comment.ownerId}</div>
            <div className="comment-content">{comment.content}</div>
          </div>
        ))
      ) : (
        <div className="comment-empty">상품 댓글이 없습니다.</div>
      )}
    </div>
  );
}

export default CommentsSection;
