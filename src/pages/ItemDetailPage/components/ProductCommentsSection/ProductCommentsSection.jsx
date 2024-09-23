import { useEffect, useState } from "react";
import { DropDown } from "../DropDown/DropDown";
import { CommentsNoExist } from "../CommentsNoExist/CommentsNoExist";
import { CommentEditBox } from "../CommentEditBox/CommentEditBox";
import kebab from "../../../../assets/images/icons/ic_kebab.png";
import profileImage from "../../../../assets/images/logo/profile.png";
import S from "./ProductCommentsSection.styes";

export function ProductCommentsSection({ info }) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(null);
  const [activeDropDown, setActiveDropDown] = useState(null);
  const [comments, setComments] = useState(info?.list || []);
  const isCommentEmpty =
    info &&
    (info.list === null || info.list.length === 0 || comments.length === 0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onCommentEdit = (id) => {
    if (isEdit === id) setIsEdit(null);
    else setIsEdit(id);
  };

  const deleteComment = (id) => {
    const newComments = comments.filter((comment) => comment.id !== id);
    setComments(newComments);

    // 실제 서버에서 삭제하는 로직
    // deleteProductComment(id);
  };

  const handleUpdateComment = (id, newContent) => {
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, content: newContent } : comment
    );
    setComments(updatedComments);
    setIsEdit(null);
    setActiveDropDown(null);
  };

  const toggleDropDown = (id) => {
    if (id === activeDropDown) setActiveDropDown(null);
    else setActiveDropDown(id);
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
    <S.Container>
      <S.CommentInput onSubmit={handleSubmit}>
        <label style={{ color: "#111827" }}>문의하기</label>
        <S.CommentTextArea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        ></S.CommentTextArea>
        <S.SubmitButton type="submit" isActive={content.length >= 5}>
          등록
        </S.SubmitButton>
      </S.CommentInput>

      {isCommentEmpty || isLoading ? (
        <CommentsNoExist />
      ) : (
        <S.CommentList>
          {comments.map((comment) =>
            comment.id === isEdit ? (
              <CommentEditBox
                key={comment.id}
                info={comment}
                onClick={cancleEditMode}
                onSubmit={(newContent) =>
                  handleUpdateComment(comment.id, newContent)
                }
              />
            ) : (
              <S.CommentBox key={comment.id}>
                <S.CommentContent>
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
                </S.CommentContent>
                <S.AuthorProfile>
                  <S.ProfileImage>
                    <img
                      src={comment.writer.image ?? profileImage}
                      alt="Author Profile"
                    />
                  </S.ProfileImage>
                  <S.ProfileDetails>
                    <div style={{ fontSize: "14px" }}>
                      {comment.writer.nickname}
                    </div>
                    <div style={{ color: "#9CA3AF" }}>
                      {comment.updatedAt.slice(0, 10)}
                    </div>
                  </S.ProfileDetails>
                </S.AuthorProfile>
              </S.CommentBox>
            )
          )}
        </S.CommentList>
      )}
    </S.Container>
  );
}
