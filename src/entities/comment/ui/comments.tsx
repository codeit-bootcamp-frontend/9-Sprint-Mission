import { useEffect, useState } from "react";
import DropdownMenu from "../../../shared/ui/dropdown-menu";
import { getProductComments } from "../api/comments";
import { Comment } from "../types/comment.types";
import { CommentsSectionProps } from "../types/comments-section-props.types";
import { ProductCommentsParams } from "../types/product-comments-params.types";
import KebabIcon from "../../../shared/assets/images/icons/ic_kebab.svg";
import ProfileIcon from "../../../shared/assets/images/icons/ic_profile.svg";
import CommentEmptyImage from "../../../shared/assets/images/comment/comment_empty.png";

const COMMENT_LIMIT = 10;

function CommentsSection({ productId }: CommentsSectionProps) {
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [nextCursor, setNextCursor] = useState<number>(0);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!Number(productId)) return;

    const fetchComments = async () => {
      setIsLoading(true);
      const params: ProductCommentsParams = {
        limit: COMMENT_LIMIT,
        cursor: nextCursor,
      };

      try {
        const data = await getProductComments(productId, params);
        setComments((prevComments) => {
          return nextCursor ? [...prevComments, ...data.list] : data.list;
        });
        setNextCursor(data.nextCursor || null);
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

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("댓글 등록: ", newComment);
    setNewComment("");
  };

  const toggleDropdown = (id: number) => {
    setDropdownVisible((prevVisible) => (prevVisible === id ? null : id));
  };

  const handleDropdownItemClick = (item: {
    label: string;
    action: () => void;
  }) => {
    console.log(item.label);
    setDropdownVisible(null); // Close dropdown after action
  };

  const dropdownItems = [
    { label: "수정하기", action: () => console.log("Edit clicked") },
    { label: "삭제하기", action: () => console.log("Delete clicked") },
  ];

  const detailDate = (updatedAt: string) => {
    let now = new Date();
    let utc = new Date(updatedAt);
    let offset = utc.getTimezoneOffset();
    let local = new Date(utc.getTime() + offset * 60000);
    const milliSeconds = now.getTime() - local.getTime();
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };

  if (isLoading) {
    return <div>상품 댓글 로딩중...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }

  return (
    <div className="comments-section">
      <div className="comment-title">문의하기</div>
      <div className="comment-input-section">
        <textarea
          className="comment-input"
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          value={newComment}
          onChange={handleCommentChange}
        />
        <button
          className="comment-submit-button"
          onClick={handleCommentSubmit}
          disabled={!newComment.trim()}
        >
          등록
        </button>
      </div>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="comment">
            {!comment.writer.image && (
              <ProfileIcon className="comment-profile-icon" alt="profile" />
            )}
            {comment.writer.image && (
              <img
                src={comment.writer.image}
                className="comment-profile-icon"
                alt="profile"
              />
            )}
            <div className="comment-content-container">
              <div className="comment-header">
                <div className="comment-user">{comment.writer.nickname}</div>
                <div className="comment-time">
                  {detailDate(comment.updatedAt)}
                </div>
                <div className="comment-kebab-container">
                  <KebabIcon
                    className="comment-kebab-icon"
                    alt="options"
                    onClick={() => toggleDropdown(comment.id)}
                  />
                  {dropdownVisible === comment.id && (
                    <DropdownMenu
                      items={dropdownItems}
                      onItemClick={handleDropdownItemClick}
                    />
                  )}
                </div>
              </div>
              <div className="comment-content">{comment.content}</div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <img src={CommentEmptyImage} alt="no comments" />
          <div className="comment-empty">아직 문의가 없어요</div>
        </div>
      )}
    </div>
  );
}

export default CommentsSection;
