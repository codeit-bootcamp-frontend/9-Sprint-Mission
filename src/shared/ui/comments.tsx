// CommentsSection.tsx
import styled from "styled-components";
import { useEffect, useState } from "react";
import CommentItem from "./comment-item"; // 새로운 컴포넌트 임포트
import { getProductComments, getArticleComments } from "../api/comments";
import { Comment } from "../types/comment";
import { CommentsResponse, ErrorResponse } from "../types/comment";
import { COMMENT_TYPE } from "../types/comment-type";
import { CommentsSectionProps } from "../types/comments-section-props";
import CommentEmptyImage from "../assets/images/comment/comment_empty.png";

// Styled Components
const CommentsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const CommentTitle = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  float: left;
  margin: 0 24px;
  padding: 0 16px;
`;

const CommentInputSection = styled.div`
  width: 98%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  margin: 16px;
  padding: 12px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  height: 80px;
  border: none;
  border-radius: 8px;
  resize: none;
  font-size: 14px;
  color: var(--gray-800);
  margin-bottom: 8px;
  padding: 8px;

  ::placeholder {
    color: var(--gray-400);
  }
`;

const SubmitButton = styled.button`
  align-self: flex-end;
  background-color: var(--blue-100);
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: var(--blue-200);
  }

  &:disabled {
    background-color: var(--gray-100);
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

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
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null); // id 기반으로 상태 관리
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
        let responseData: CommentsResponse | null = null;
        if (type === COMMENT_TYPE.product) {
          responseData = await getProductComments(id, params);
        } else if (type === COMMENT_TYPE.article) {
          responseData = await getArticleComments(id, params);
        }

        if (responseData && isErrorResponse(responseData)) {
          setMessage(responseData.message);
        } else if (responseData) {
          setComments((prevComments) => {
            if (nextCursor) {
              return [...prevComments, ...responseData.list];
            } else {
              return [...responseData.list];
            }
          });

          setNextCursor(responseData.nextCursor);
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

  const toggleDropdown = (commentId: number) => {
    setDropdownVisible((prevVisible) =>
      prevVisible === commentId ? null : commentId
    );
  };

  const handleEditClick = (commentId: number) => {
    console.log(`commentId: ${commentId}, Edit clicked`);
    setDropdownVisible(null);
  };

  const handleDeleteClick = (commentId: number) => {
    console.log(`commentId: ${commentId}, Delete clicked`);
    setDropdownVisible(null);
  };

  if (isLoading) {
    return <div>댓글 로딩중...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }

  if (message) {
    return <div>{message}</div>;
  }

  return (
    <CommentsWrapper>
      <CommentTitle>댓글 달기</CommentTitle>
      <CommentInputSection>
        <CommentInput
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          value={newComment}
          onChange={handleCommentChange}
        />
        <SubmitButton
          onClick={handleCommentSubmit}
          disabled={!newComment.trim()}
        >
          등록
        </SubmitButton>
      </CommentInputSection>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            dropdownVisible={dropdownVisible}
            toggleDropdown={toggleDropdown}
            handleEditClick={() => handleEditClick(comment.id)}
            handleDeleteClick={() => handleDeleteClick(comment.id)}
          />
        ))
      ) : (
        <div>
          <img src={CommentEmptyImage} alt="no comments" />
          <div className="comment-empty">아직 댓글이 없어요</div>
        </div>
      )}
    </CommentsWrapper>
  );
}

export default CommentsSection;
