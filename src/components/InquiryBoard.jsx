import { useEffect, useState } from "react";
import styled from "styled-components";
import { getProductByIdComments } from "../api/Api";
import { useParams } from "react-router-dom";
import kebab from "../assets/ic_kebab.png";
import UserInfo from "../components/UserInfo";
import EditBox from "./EditBox";
import noInquiryImg from "../assets/Frame 2610489.png";

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

  li {
    padding-bottom: 24px;
    border-bottom: 1px solid #e5e7eb;
  }

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

const NoInquiry = styled.div`
  margin-bottom: 48px;
  display: flex;
  justify-content: center;

  img {
  width: 196px;
  height: auto;
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
    <>
      {comments.list?.length > 0 ? (
        <Board>
          {comments.list.map((comment) => (
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
      ) : <NoInquiry><img src={noInquiryImg} alt="아직 문의가 없어요" /></NoInquiry>}
    </>
  );
}

export default InquiryBoard;
