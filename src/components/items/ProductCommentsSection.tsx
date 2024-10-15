import { useEffect, useState } from "react";
import styled from "styled-components";
import DropDown from "./DropDown";
import CommentsNoExist from "./CommentsNoExist";
import CommentEditBox from "./CommentEditBox";
import kebab from "@/assets/images/icons/ic_kebab.png";
import profileImage from "@/assets/images/logo/profile.png";

// Comment 타입 정의
interface Comment {
  id: number;
  content: string;
  writer: {
    image?: string;
    nickname: string;
  };
  updatedAt: string;
}

// info prop 타입 정의
interface ProductCommentsSectionProps {
  info: {
    list: Comment[];
  } | null;
}

export function ProductCommentsSection({ info }: ProductCommentsSectionProps) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState<number | null>(null);
  const [activeDropDown, setActiveDropDown] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  // comments가 비어있는지 여부를 체크
  const isCommentEmpty =
    info &&
    (info.list === null || info.list.length === 0 || comments.length === 0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 댓글 등록 로직을 추가
  };

  const onCommentEdit = (id: number) => {
    setIsEdit((prevEditId) => (prevEditId === id ? null : id));
  };

  const deleteComment = (id: number) => {
    const newComments = comments.filter((comment) => comment.id !== id);
    setComments(newComments);

    // 실제 서버에서 삭제하는 로직
    // deleteProductComment(id);
  };

  const handleUpdateComment = (id: number, newContent: string) => {
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, content: newContent } : comment
    );
    setComments(updatedComments);
    setIsEdit(null);
    setActiveDropDown(null);
  };

  const toggleDropDown = (id: number) => {
    setActiveDropDown((prevActiveId) => (prevActiveId === id ? null : id));
  };

  const cancleEditMode = () => {
    setIsEdit(null);
    setActiveDropDown(null);
  };

  useEffect(() => {
    if (info && info.list !== null) {
      setComments(info.list); // info.list를 comments 상태로 설정
      setIsLoading(false); // 데이터가 로드되면 로딩 상태를 해제
    }
  }, [info]);

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 컴포넌트
  }

  return (
    <Container>
      <CommentInput onSubmit={handleSubmit}>
        <label style={{ color: "#111827" }}>문의하기</label>
        <CommentTextArea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        ></CommentTextArea>
        <SubmitButton type="submit" isActive={content.length >= 5}>
          등록
        </SubmitButton>
      </CommentInput>

      {isCommentEmpty || isLoading ? (
        <CommentsNoExist />
      ) : (
        <CommentList>
          {comments.map((comment) =>
            comment.id === isEdit ? (
              <CommentEditBox
                key={comment.id}
                info={comment}
                onClick={cancleEditMode}
                onSubmit={(newContent: string) =>
                  handleUpdateComment(comment.id, newContent)
                }
              />
            ) : (
              <CommentBox key={comment.id}>
                <CommentContent>
                  <div
                    style={{
                      width: "1172px",
                      height: "24px",
                      fontSize: "14px",
                      color: "#1F2937",
                    }}
                  >
                    {comment.content}
                  </div>
                  <button
                    style={{ width: "24px", height: "24px" }}
                    onClick={() => toggleDropDown(comment.id)}
                  >
                    <img src={kebab} alt="/" />
                  </button>
                  {comment.id === activeDropDown && (
                    <DropDown
                      onClick={() => onCommentEdit(comment.id)}
                      onSubmit={() => deleteComment(comment.id)}
                      id={comment.id}
                    />
                  )}
                </CommentContent>
                <AuthorProfile>
                  <ProfileImage>
                    <img
                      src={comment.writer.image ?? profileImage}
                      alt="Author Profile"
                    />
                  </ProfileImage>
                  <ProfileDetails>
                    <div style={{ fontSize: "14px" }}>
                      {comment.writer.nickname}
                    </div>
                    <div style={{ color: "#9CA3AF" }}>
                      {comment.updatedAt.slice(0, 10)}
                    </div>
                  </ProfileDetails>
                </AuthorProfile>
              </CommentBox>
            )
          )}
        </CommentList>
      )}
    </Container>
  );
}

// 스타일 컴포넌트 정의
const Container = styled.div`
  width: 100%;
`;

const CommentInput = styled.form`
  display: flex;
  flex-direction: column;
`;

const CommentTextArea = styled.textarea`
  width: 100%;
  height: 104px;
  margin-top: 9px;
  padding: 16px 24px;
  background-color: #f3f4f6;
  border: none;
  border-radius: 12px;
  color: var(--gray-300);
  resize: none;
  overflow-y: auto;
`;

const SubmitButton = styled.button<SubmitButtonProps>`
  width: 74px;
  height: 42px;
  margin-top: 16px;
  margin-left: auto;
  border-radius: 8px;
  padding: 12px 23px;
  color: white;
  background-color: ${({ isActive }) =>
    isActive ? "var(--blue)" : "var(--gray-400)"}; // props 사용 방식 수정
  cursor: ${({ isActive }) =>
    isActive ? "pointer" : "not-allowed"}; // props 사용 방식 수정
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
`;
const CommentBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--gray-100);
`;

const CommentContent = styled.div`
  position: relative;
  display: flex;
`;

const AuthorProfile = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  margin-top: 24px;
`;

const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray-200);
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;
  }
`;

const ProfileDetails = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-grow: 1;
`;
