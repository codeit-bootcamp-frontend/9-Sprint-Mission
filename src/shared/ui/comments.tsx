import { useEffect, useState } from "react";
import DropdownMenu from "./dropdown-menu";
import { getProductComments, getArticleComments } from "../api/comments"; // 두 가지 API 가져오기
import { Comment } from "../types/comment";
import { CommentsSectionProps } from "../types/comments-section-props";
import { ReactComponent as KebabIcon } from "../assets/images/icons/ic_kebab.svg";
import { ReactComponent as ProfileIcon } from "../assets/images/icons/ic_profile.svg";
import CommentEmptyImage from "../assets/images/comment/comment_empty.png";
import { DropdownMenuItem } from "../types/dropdown-menu";
import { CommentsResponse, ErrorResponse } from "../types/comment";
import { COMMENT_TYPE } from "../types/comment-type";

const COMMENT_LIMIT = 10;

function isErrorResponse(
  response: CommentsResponse
): response is ErrorResponse {
  return (response as ErrorResponse).message !== undefined;
}

function CommentsSection({ id, type }: CommentsSectionProps) {
  const [newComment, setNewComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(0);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!Number(id)) return;

    const fetchComments = async () => {
      setIsLoading(true);
      const params = {
        limit: COMMENT_LIMIT,
        cursor: nextCursor,
      };

      try {
        let responseData: CommentsResponse | null = null; // 초기값 설정
        // 타입에 따라 적절한 API 호출
        if (type === COMMENT_TYPE.product) {
          responseData = await getProductComments(id, params);
        } else if (type === COMMENT_TYPE.article) {
          responseData = await getArticleComments(id, params);
        }

        if (responseData && isErrorResponse(responseData)) {
          // message가 존재하면 상태 설정
          setMessage(responseData.message);
        } else if (responseData) {
          setComments((prevComments: Comment[]) => {
            if (nextCursor) {
              // 결합된 배열을 명확히 Comment[]로 보장
              return [...prevComments, ...responseData.list] as Comment[];
            } else {
              return [...responseData.list] as Comment[];
            }
          });

          setNextCursor(responseData.nextCursor as number);
          setError(null);
        }
      } catch (error) {
        console.log("Error fetching comments:", error);
        setError("댓글을 불러오지 못했어요.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [id, nextCursor, type]);

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

  const dropdownItems: DropdownMenuItem[] = [
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
    return <div>댓글 로딩중...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }

  if (message) {
    console.log("🚀 ~ CommentsSection ~ message:", message);
    return <div>{message}</div>;
  }

  return (
    <div className="comments-section">
      <div className="comment-title">댓글 달기</div>
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
              <ProfileIcon className="comment-profile-icon" />
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
          <div className="comment-empty">아직 댓글이 없어요</div>
        </div>
      )}
    </div>
  );
}

export default CommentsSection;
