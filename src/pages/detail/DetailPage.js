import { useEffect, useState } from "react";
import axios from "axios";
import "./DetailPage.css";
import { useNavigate, useParams } from "react-router-dom";
import ProductHeader from "../../components/detailcomponents/ProductHeader";
import AskBox from "../../components/detailcomponents/AskBox";
import Comment from "../../components/detailcomponents/Comment";
import CommentUser from "../../components/detailcomponents/CommentUser";
import NoComment from "../../components/detailcomponents/Nocomment";
import BackToList from "../../components/detailcomponents/BackToList";

function DetailPage({ data }) {
  // id값 데이터만 get해오기
  let { id } = useParams();
  const [targetProduct, setTargetProduct] = useState({});
  useEffect(() => {
    axios
      .get(`https://panda-market-api.vercel.app/products/${id}`)
      .then((res) => {
        setTargetProduct(res.data);
      })
      .catch((err) => {
        console.error("targetProduct 오류", err);
      });
  }, [id]);

  // comments get해오기
  const [comments, setComments] = useState({ list: [] });
  useEffect(() => {
    axios
      .get(
        `https://panda-market-api.vercel.app/products/${id}/comments?limit=5`
      )
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.error("comments 오류", err);
      });
  }, [id]);

  // 만든 날짜 형식 변경
  function dateChange(target) {
    const newDate = new Date(target).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return newDate;
  }

  let navigate = useNavigate();
  return (
    <div className="container">
      <ProductHeader targetProduct={targetProduct} dateChange={dateChange} />
      <div className="mainContent">
        <AskBox />
        {comments.list.length !== 0 ? (
          comments.list.map((item) => {
            return (
              <div className="main__CommentBox" key={item.id}>
                <div className="commentBox__container">
                  <Comment item={item} />
                  <CommentUser item={item} dateChange={dateChange} />
                </div>
              </div>
            );
          })
        ) : (
          <NoComment />
        )}
        <BackToList navigate={navigate} />
      </div>
    </div>
  );
}

export default DetailPage;
