import { useEffect, useState } from "react";
import "./Contact.css";
import axios from "axios";
import toast from "react-hot-toast";
import EditForm from "./EditForm";
import CommentEdit from "./CommentEdit";
import { formatCommentsTime } from "../../../utils/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ContactSchema } from "./ContactConstants";
import { zodResolver } from "@hookform/resolvers/zod";

interface IProps {
  productId: string | undefined;
}

interface IWriter {
  image: string;
  nickname: string;
  id: number;
}

interface IList {
  id: number;
  content: string;
  writer: IWriter;
  updatedAt: string;
}

interface IComment {
  nextCursor: number;
  list: IList[];
}

const Contact: React.FC<IProps> = ({ productId }) => {
  const [comments, setComments] = useState<IComment>({ nextCursor: 0, list: [] }); // 타입 좁히기로도 해결 가능
  const [openCommentId, setOpenCommentId] = useState<number | null>(null); // 모달 열고 닫을 때 활용하는 댓글 id
  const [editCommentId, setEditCommentId] = useState<number | null>(null); // 수정할 댓글의 form만 열리고 수정하는 데 활용하는 댓글 id
  const [isCommentsLoading, setCommentsLoading] = useState(false);

  // 댓글 목록 불러오기
  useEffect(() => {
    const getComments = async () => {
      try {
        setCommentsLoading(true);
        const response = await axios.get(
          `https://panda-market-api.vercel.app/products/${productId}/comments?limit=10`
        );

        if (response.status === 200) {
          setComments(response.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("상세페이지 getComments GET 요청에서 API 오류 발생", error);
          toast.error(error.response?.data.message, {duration: 8000});
        } else {
          console.error("상세페이지 getComments GET 요청에서 서버 오류 발생", error);
          toast.error("오류가 발생하여 댓글을 불러오지 못했습니다.", {duration: 8000});
        }
      } finally {
        setCommentsLoading(false);
      }
    };

    getComments();
  }, [productId]);

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    mode: "all",
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const error = form.formState.errors;

  // 댓글 업로드
  const onSubmit = async (values: z.infer<typeof ContactSchema>) => {
    try {
      const response = await axios.post(
        `https://panda-market-api.vercel.app/products/${productId}/comments`,
        {
          content: values.content,
        }
      );

      if (response.status === 200) {
        form.reset();
        toast.success("댓글이 업로드되었습니다.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("상세페이지 댓글 onSubmit POST 요청에서 API 오류 발생", error);
        toast.error(error.response?.data.message);
      } else {
        console.error("상세페이지 댓글 onSubmit POST 요청에서 알 수 없는 오류 발생", error);
        toast.error("오류가 발생하여 업로드되지 않았습니다.");
      }
    }
  };

  // 메뉴 모달 토글 함수 (동전뒤집기처럼 boolean으로 했다가 다른 댓글의 모달도 떠서 댓글id로 관리해주는 것으로 수정)
  const onEditMenuToggle = (commentId: number) => {
    setOpenCommentId((prevId) => (prevId === commentId ? null : commentId));
  };

  return (
    <div className="contactContainer">
      <form className="commentForm" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="commentFormItem">
          <label htmlFor="comment" className="itemTitle">
            문의사항
          </label>
          <textarea
            {...form.register("content")}
            id="content"
            name="content"
            className="itemContents"
            rows={5}
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          />
        </div>
        <div className="commentBtnBox">
          {error ? <span className="commentError">{error.content?.message}</span> : <span />}
          <button type="submit" className="commentSubmitBtn" disabled={!form.formState.isValid}>
            {isLoading ? "등록중" : "등록"}
          </button>
        </div>
      </form>
      {!isCommentsLoading ? (
        comments?.list.length > 0 ? (
          comments?.list.map((comment) => (
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
                      <img src="/icons/itemMenu.png" alt="아이템 메뉴" />
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
                    <img src="/icons/sessionBtn.png" alt="유저프로필" />
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
            <img src="/images/commentEmpty.png" alt="댓글 없음" />
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
