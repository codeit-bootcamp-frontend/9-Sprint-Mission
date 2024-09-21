import { useState, useEffect, MouseEvent, FormEvent, ChangeEvent } from "react";
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
import { Comments } from "../Types/Types";

const CommentsSection = ({ productId }: { productId: string }) => {
  const [comments, setComments] = useState<Comments[]>([]);
  const [commentText, setCommentText] = useState("");

  // 상품 댓글 조회
  useEffect(() => {
    if (!productId) return;

    const fetchProductsComments = async () => {
      // const params = { limit: 10 };

      try {
        const data = await getProductsComments(productId);
        setComments(data.list);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchProductsComments();
  }, [productId]);

  const onSubmit = async (content: string) => {
    const newComment = await postProductsComments(productId, content);
    setComments([...comments, newComment]);
  };

  const onDelete = (id: number) => {
    setComments(
      comments.filter((comment) => Number(comment.id) !== Number(id))
    );
  };

  const onUpdate = async (id: number, content: string) => {
    const updateComment: Comments = await patchProductsComments(
      productId,
      id,
      content
    );
    setComments(
      comments.map((comment) =>
        Number(comment.id) === Number(id) ? updateComment : comment
      )
    );
  };

  const handleChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (commentText) {
      onSubmit(commentText);
      setCommentText("");
    }
  };

  return (
    <section className="CommentsSection">
      <form className="CommentsForm" onSubmit={handleSubmit}>
        <Title>문의하기</Title>
        <Textarea
          height="creat"
          name="content"
          value={commentText}
          onChange={handleChangeTextarea}
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

const HEIGHT = {
  creat: 104,
  edit: 80,
};

export const Textarea = styled.textarea<{ height: "creat" | "edit" }>`
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
