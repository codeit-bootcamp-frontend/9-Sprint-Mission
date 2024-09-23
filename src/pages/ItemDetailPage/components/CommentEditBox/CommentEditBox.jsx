import profileImage from "../../../../assets/images/logo/profile.png";
import { useState } from "react";
import S from "./CommentEditBox.styles";

export function CommentEditBox({ info, onClick, onSubmit }) {
  const [editContent, setEditContent] = useState(info.content);

  const handleEditChange = (e) => {
    setEditContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editContent); // 새로운 내용을 부모 컴포넌트로 전달
  };

  return (
    <form onSubmit={handleSubmit}>
      <S.TextArea
        value={editContent}
        onChange={handleEditChange}
        placeholder="내용을 입력하세요"
      />
      <div style={{ display: "flex" }}>
        <S.AuthorProfile>
          <S.ProfileImage>
            <img src={info.writer.image ?? profileImage} alt="Author Profile" />
          </S.ProfileImage>
          <S.ProfileDetails>
            <div style={{ fontSize: "14px" }}>{info.writer.nickname}</div>
            <div style={{ color: "#9CA3AF" }}>
              {info.updatedAt.slice(0, 10)}
            </div>
          </S.ProfileDetails>
        </S.AuthorProfile>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <S.CancleButton onClick={onClick}>취소</S.CancleButton>
          <S.ConfirmButton type="submit">수정 완료</S.ConfirmButton>
        </div>
      </div>
    </form>
  );
}
