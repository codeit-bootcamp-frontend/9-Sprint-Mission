import styled from "styled-components";

const S = {};

S.Container = styled.div`
  width: 100%;
`;

S.CommentInput = styled.form`
  display: flex;
  flex-direction: column;
`;

S.CommentTextArea = styled.textarea`
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

S.SubmitButton = styled.button`
  width: 74px;
  height: 42px;
  margin-top: 16px;
  margin-left: auto;
  border-radius: 8px;
  padding: 12px 23px;
  color: white;
  background-color: ${(props) =>
    props.isActive ? "var(--blue)" : "var(--gray-400)"};
  cursor: ${(props) => (props.isActive ? "pointer" : "not-allowed")};
`;

S.CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
`;

S.CommentBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--gray-100);
`;

S.CommentContent = styled.div`
  position: relative;
  display: flex;
`;

S.AuthorProfile = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  margin-top: 24px;
`;

S.ProfileImage = styled.div`
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

S.ProfileDetails = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-grow: 1;
`;

export default S;
