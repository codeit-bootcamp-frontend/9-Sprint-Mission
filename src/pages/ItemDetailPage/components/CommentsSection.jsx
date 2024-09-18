import styled from "styled-components";

const ReplyInput = styled.form`
  display: flex;
  flex-direction: column;
`;

const ReplyInputTextArea = styled.textarea`
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

const SubmitReplyButton = styled.button`
  width: 74px;
  height: 42px;
  margin-top: 16px;
  margin-left: auto;
  border-radius: 8px;
  padding: 12px 23px;
  background-color: var(--gray-400);
  color: var(--gray-100);
`;

const ReplyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ReplyBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--gray-100);
`;

const ReplyContent = styled.div`
  display: flex;
`;

const Author = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
`;

const Profile = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray-200);
  border-radius: 50%;
`;

const AuthorInfo = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-grow: 1;
`;

export function CommentsSection({ info }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <ReplyInput onSubmit={handleSubmit}>
        <label style={{ color: "#111827" }}>문의하기</label>
        <ReplyInputTextArea placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."></ReplyInputTextArea>
        <SubmitReplyButton type="submit">등록</SubmitReplyButton>
      </ReplyInput>
      {/* <ReplyList>
        {info.list.map((reply) => (
          <ReplyBox>
            <ReplyContent>
              <div
                style={{
                  width: "1172px",
                  height: "24px",
                  fontSize: "14px",
                  color: "#1F2937",
                }}
              >
                {reply.content}
              </div>
              <button style={{ width: "24px", height: "24px" }}>
                <img src="../../../assets/images/icons/ic_kebab.png" alt="/" />
              </button>
            </ReplyContent>
            <Author>
              <Profile>
                <img src={reply.image} alt="Author Profile" />
              </Profile>
              <AuthorInfo>
                <div style={{ fontSize: "14px" }}>{reply.nickname}</div>
                <div style={{ color: "#9CA3AF" }}>{reply.updatedAt}</div>
              </AuthorInfo>
            </Author>
          </ReplyBox>
        ))}
      </ReplyList> */}
    </>
  );
}
