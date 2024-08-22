import { useEffect, useState } from "react";
import axios from "axios";
import "./DetailPage.css";
import { useNavigate, useParams } from "react-router-dom";
import EditBox from "../../components/detailcomponents/editBox";

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
  }, []);

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
  }, []);

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

  let [activeBtn, setActiveBtn] = useState(false);
  let [activeComment, setActiveComment] = useState(true);

  return (
    <div className="container">
      <div className="header">
        <div className="productsImg">
          <img src={targetProduct.images} alt="상품이미지" />
        </div>
        <div className="productsContentBox">
          <div className="productsContentTitle">
            <h4>{targetProduct.name}</h4>
            <p>{targetProduct.price} 원</p>
          </div>
          <div>
            <p className="productsTitle">상품소개</p>
            <p className="productsDescription">{targetProduct.description}</p>
          </div>
          <div>
            <p className="productsTitle">상품태그</p>
            <div className="productsTagBox">
              <div className="productsTags">tags</div>
            </div>
          </div>
          <div className="userBox">
            <div className="userBoxIcon">
              <div>
                <img src="/ic_profile.png" alt="id-icon" width="100%" />
              </div>
              <div className="userBoxId">
                <div className="userBoxId__id"> 총명한 판다 </div>
                <div className="userBoxId__date">
                  {dateChange(targetProduct.updatedAt)}
                </div>
              </div>
            </div>
            <div className="userBoxLike">
              <div className="userBoxLike__count">
                <img src="/heart.png" alt="하트이미지" />
                <div className="userBoxLike__favoriteCount">
                  {targetProduct.favoriteCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mainContent">
        <div className="main__AskBox">
          <div className="askBoxLabel">
            <label htmlFor="ask" className="askBoxTitle">
              문의하기
            </label>
          </div>
          <textarea
            type="text"
            id="ask"
            className="askBoxTextarea"
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            onChange={(e) => {
              e.target.value === "" ? setActiveBtn(false) : setActiveBtn(true);
            }}
          ></textarea>
          <div className="askBoxButton">
            <button
              className={
                activeBtn === false ? "askBoxButton__btn" : "changeColor"
              }
            >
              등록
            </button>
          </div>
        </div>

        {comments.list.length !== 0 ? (
          comments.list.map((item) => {
            return (
              <div className="main__CommentBox">
                <div className="commentBox__container">
                  {activeComment === true ? (
                    <div className="commentBox__comment">{item.content}</div>
                  ) : (
                    <>
                      <input className="commentBox__editMode"></input>
                      <div className="commentBox__editModeBtn">
                        <button className="commentBox__editModeBtn--cancel">
                          취소
                        </button>
                        <button className="commentBox__editModeBtn--complete">
                          수정완료
                        </button>
                      </div>
                    </>
                  )}

                  {/* <div className="commentBox__comment">{item.content}</div> */}
                  <div className="userBox inCommentBox">
                    <div className="userBoxIcon">
                      <div className="commentBox__icon">
                        <img
                          src={item.writer.image}
                          alt="id-icon"
                          width="100%"
                        />
                      </div>
                      <div className="userBoxId">
                        <div className="userBoxId__id">
                          {item.writer.nickname}
                        </div>
                        <div className="userBoxId__date">
                          {" "}
                          {dateChange(item.updatedAt)}{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <EditBox setActiveComment={setActiveComment} />
                {/* <div className="commentBox__editBox">
                <div className="commentBox__edit">
                  <img
                    src="/edit.png"
                    alt="더보기이미지"
                    onClick={() => {
                      setEditBox(!editBox);
                    }}
                  />
                </div>
                {editBox === true ? <EditBox /> : null}
              </div> */}
              </div>
            );
          })
        ) : (
          <div>
            <img src="/no-comment.png" alt="코멘트없음" />
          </div>
        )}

        <button
          className="link"
          onClick={() => {
            navigate("/items");
          }}
        >
          목록으로 돌아가기
          <img src="/arrow_left.png" alt="뒤로가기이미지" />
        </button>
      </div>
    </div>
  );
}

export default DetailPage;
