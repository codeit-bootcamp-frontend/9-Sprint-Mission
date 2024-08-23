import { useEffect, useState } from "react";
import styled from "styled-components";
import { getProductByIdComments } from "../api/Api";
import { useParams } from "react-router-dom";
import kebab from "../assets/ic_kebab.png";
import UserInfo from "../components/UserInfo";
import EditBox from "./EditBox";

export const Kebab = styled.button`
  border: none;
  width: 24px;
  height: 24px;
  background-image: url(${kebab});
  background-repeat: no-repeat;
  background-color: transparent;
`;

const Board = styled.ul`
  margin: 0 0 64px 0;
  list-style: none;
  padding: 0 0 12px 0;
  border-bottom: 1px solid #e5e7eb;

  .content-box {
    display: flex;
    justify-content: space-between;

    div {
      font-size: 14px;
      font-weight: 400;
      line-height: 26px;
      color: #1f2937;
    }
  }
  .kebab {
    position: relative;
  }
`;

function InquiryBoard() {
  const { productId } = useParams();
  const [comments, setComments] = useState({});

  const getComment = async (id) => {
    const data = await getProductByIdComments(id);
    setComments(data);
  };

  useEffect(() => {
    getComment(productId);
  }, [productId]);

  return (
    <Board>
      {comments.list?.map((comment) => (
        <li key={comment.id}>
          <div className="content-box">
            <div>{comment.content}</div>
            <div className="kebab">
              <Kebab></Kebab>
              <EditBox />
            </div>
          </div>
          <UserInfo comment={comment} />
        </li>
      ))}
    </Board>
  );
}

export default InquiryBoard;
