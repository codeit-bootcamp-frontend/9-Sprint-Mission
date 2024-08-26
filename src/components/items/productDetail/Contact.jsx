import { useEffect, useState } from "react";
import "./Contact.css";
import axios from "axios";
import { formatCommentsTime } from "../../../utils/utils";
import CommentEdit from "./CommentEdit";
import EditForm from "./EditForm";

const Contact = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [openCommentId, setOpenCommentId] = useState(null); // 모달 열고 닫을 때 활용하는 댓글 id
  const [editCommentId, setEditCommentId] = useState(null); // 수정할 댓글의 form만 열리고 수정하는 데 활용하는 댓글 id

  // 댓글 목록 불러오기
  useEffect(() => {
    const getComments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://panda-market-api.vercel.app/products/${productId}/comments?limit=10`
        );

        if (response.status === 200) {
          setComments(response.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("상세페이지 getComments GET 요청에서 오류 발생", error);
        }
      } finally {
        setLoading(false);
      }
    };

    getComments();
  }, [productId]);

  // 댓글 업로드
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://panda-market-api.vercel.app/products/${productId}/comments`,
        {
          content: newComment,
        }
      );

      if (response.status === 200) {
        console.log("댓글 업로드됨", response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("상세페이지 댓글 onSubmit POST 요청에서 오류 발생", error);
      }
    }
  };

  // 댓글입력 변경함수
  const onChangeComment = (e) => {
    setNewComment(e.target.value);
  };

  // 메뉴 모달 토글 함수 (동전뒤집기처럼 boolean으로 했다가 다른 댓글의 모달도 떠서 댓글id로 관리해주는 것으로 수정)
  const onEditMenuToggle = (commentId) => {
    setOpenCommentId((prevId) => (prevId === commentId ? null : commentId));
  };

  return (
    <div className="contactContainer">
      <form className="commentForm" onSubmit={onSubmit}>
        <div className="commentFormItem">
          <label htmlFor="comment" className="itemTitle">
            문의사항
          </label>
          <textarea
            id="comment"
            name="comment"
            className="itemContents"
            onChange={onChangeComment}
            value={newComment}
            rows={5}
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          />
        </div>
        <button type="submit" className="submitBtn" disabled={!newComment}>
          등록
        </button>
      </form>
      {!isLoading ? (
        comments.list?.length > 0 ? (
          comments.list.map((comment) => (
            <div key={comment.id} className="commentsListBox">
              <div className="listContents">
                {editCommentId !== comment.id ? (
                  <p>{comment.content}</p>
                ) : (
                  <EditForm
                    content={comment.content}
                    commentId={comment.id}
                    setOpenCommentId={setOpenCommentId}
                    setEditCommentId={setEditCommentId}
                  />
                )}
                {editCommentId !== comment.id && (
                  <div className="modalBox">
                    <button onClick={() => onEditMenuToggle(comment.id)} className="editMenuBtn">
                      <img src="/itemMenu.png" alt="아이템 메뉴" />
                    </button>
                    {openCommentId === comment.id && (
                      <CommentEdit
                        setEditCommentId={setEditCommentId}
                        setOpenCommentId={setOpenCommentId}
                        commentId={comment.id}
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="commentsAuthorBox">
                <div className="author">
                  {!comment.writer.image ? (
                    <img src="/sessionBtn.png" alt="유저프로필" />
                  ) : (
                    <img src={comment.writer.image} alt="유저프로필" />
                  )}
                  <div className="commentAuthorInfo">
                    <h3>{comment.writer.nickname}</h3>
                    <span>{formatCommentsTime(comment.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="commentsEmptyBox">
            <img src="/commentEmpty.png" alt="댓글 없음" />
            <span>아직 문의가 없어요</span>
          </div>
        )
      ) : (
        <p className="loading">댓글정보를 가져오고 있습니다.</p>
      )}
    </div>
  );
};

export default Contact;
