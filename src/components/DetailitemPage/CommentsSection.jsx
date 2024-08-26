import { useState, useEffect } from "react";
import {
  getProductsComments,
  postProductsComments,
  patchProductsComments,
} from "../../api";
import { Title } from "./Detailitem";
import { Button } from "../AdditemPage/components/AdditemForm";
import styled from "styled-components";
import Comment from "./components/Comment";
import inquiryEmpty from "../../assets/images/img_inquiry_empty.svg";

const HEIGHT = {
  creat: 104,
  edit: 80,
};

export const Textarea = styled.textarea`
  font-family: Pretendard;
  background-color: ${({ theme }) => theme.gray100};
  color: ${({ theme }) => theme.gray800};
  border: none;
  border-radius: 12px;
  font-size: 1.6rem;
  padding: 20px;
  width: 100%;
  min-height: ${({ height }) => HEIGHT[height] ?? HEIGHT["creat"]}px;
  resize: vertical;
  box-sizing: border-box;
  margin-top: 1rem;

  &::placeholder {
    color: ${({ theme }) => theme.gray400};
  }

  &:focus {
    outline: none;
  }
`;

const EnquiryEmpty = styled.div`
  padding-top: 5rem;
  text-align: center;

  p {
    margin-top: 3rem;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 26px;
    color: ${({ theme }) => theme.gray400};
  }
`;

const CommentsSection = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  // 상품 댓글 조회
  useEffect(() => {
    const fetchProductsComments = async () => {
      const data = await getProductsComments(productId);
      setComments(data.list);
    };

    fetchProductsComments();
  }, [productId]);

  const onSubmit = async (content) => {
    const newComment = await postProductsComments(content);
    setComments([...comments, newComment]);
  };

  const onDelete = (id) => {
    setComments(
      comments.filter((comment) => Number(comment.id) !== Number(id))
    );
  };

  const onUpdate = async (id, content) => {
    const updateComment = await patchProductsComments(content);
    setComments(
      comments.map((comment) =>
        Number(comment.id) === Number(id) ? updateComment : comment
      )
    );
  };

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText) {
      onSubmit(productId, commentText);
      setCommentText("");
    }
  };

  console.log("값", comments);

  return (
    <section className="CommentsSection">
      <form className="CommentsForm" onSubmit={handleSubmit}>
        <Title>문의하기</Title>
        <Textarea
          name="content"
          value={commentText}
          onChange={handleChange}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        />
        <Button type="submit" disabled={!commentText}>
          등록
        </Button>
      </form>

      {comments.length > 0 ? (
        <>
          {comments &&
            comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
        </>
      ) : (
        <EnquiryEmpty>
          <img src={inquiryEmpty} alt="아직 문의가 없어요" />
          <p>아직 문의가 없어요</p>
        </EnquiryEmpty>
      )}
    </section>
  );
};

export default CommentsSection;
