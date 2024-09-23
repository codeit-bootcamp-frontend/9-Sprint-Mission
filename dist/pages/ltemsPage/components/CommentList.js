import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CommentItem from "./CommentItem";
import nocommentImg from "../../../assets/nocomment.svg";
import { getComments } from "../../../api";
import profileImg from "../../../assets/profile.svg";
import Button from "../../../components/Button";
function CommentList({ id }) {
    const idRef = useRef(0);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const data = await getComments({ id });
                setComments(data.list);
            }
            catch (error) {
                console.error(error);
            }
        };
        fetchComments();
    }, [id]);
    const handleChange = (e) => {
        setComment(e.target.value);
    };
    const handleCommentSubmit = () => {
        if (editingCommentId !== null) {
            setComments((prevComments) => prevComments.map((item) => item.id === editingCommentId
                ? { ...item, content: comment, updatedAt: new Date().toISOString() }
                : item));
            setEditingCommentId(null);
        }
        else {
            const newComment = {
                id: idRef.current++,
                content: comment,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                writer: {
                    id: 999,
                    nickname: "mungyun",
                    image: profileImg,
                },
            };
            setComments((prevComments) => [newComment, ...prevComments]);
        }
        setComment("");
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleCommentSubmit();
        }
    };
    const handleDelete = (id) => {
        setComments(comments.filter((item) => item.id !== id));
    };
    return (_jsxs(_Fragment, { children: [_jsxs(QuestionWrapper, { children: [_jsx(Title, { children: "\uBB38\uC758\uD558\uAE30" }), _jsxs("form", { onSubmit: (e) => {
                            e.preventDefault();
                            handleCommentSubmit();
                        }, children: [_jsx(QuestionBox, { onChange: handleChange, value: comment, onKeyDown: handleKeyDown, placeholder: "\uAC1C\uC778\uC815\uBCF4\uB97C \uACF5\uC720 \uBC0F \uC694\uCCAD\uD558\uAC70\uB098, \uBA85\uC608 \uD6FC\uC190, \uBB34\uB2E8 \uAD11\uACE0, \uBD88\uBC95 \uC815\uBCF4 \uC720\uD3EC\uC2DC \uBAA8\uB2C8\uD130\uB9C1 \uD6C4 \uC0AD\uC81C\uB420 \uC218 \uC788\uC73C\uBA70, \uC774\uC5D0 \uB300\uD55C \uBBFC\uD615\uC0AC\uC0C1 \uCC45\uC784\uC740 \uAC8C\uC2DC\uC790\uC5D0\uAC8C \uC788\uC2B5\uB2C8\uB2E4." }), _jsx(ButtonSection, { children: _jsx(Button, { color: "#f3f4f6", width: "74", type: "submit", disabled: comment === "", children: "\uB4F1\uB85D" }) })] })] }), comments.length > 0 ? (_jsx(CommentListWrapper, { children: comments.map((item) => (_jsx(CommentItemWrapper, { children: _jsx(CommentItem, { item: item, onDelete: handleDelete }) }, item.id))) })) : (_jsx(NoCommentSection, { children: _jsx("img", { src: nocommentImg, alt: "\uB313\uAE00 \uC5C6\uC74C", width: "196", height: "230" }) }))] }));
}
export default CommentList;
const QuestionWrapper = styled.div `
  margin: 40px 0 58px;
  position: relative;
`;
const Title = styled.h4 `
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin-top: 0;
  margin-bottom: 9px;
`;
const QuestionBox = styled.textarea `
  width: 100%;
  height: 104px;
  padding: 16px 24px 40px;
  background-color: #f3f4f6;
  border: 0;
  border-radius: 12px;
  outline: none;
  box-sizing: border-box;
  line-height: 1.2;
  resize: none;

  ::placeholder {
    color: #9ca3af;
    font-size: 16px;
  }

  @media (max-width: 768px) {
    height: 129px;
    padding: 16px 24px 70px;

    ::placeholder {
      font-size: 14px;
      white-space: pre-wrap;
    }
  }
`;
const ButtonSection = styled.div `
  display: flex;
  justify-content: right;
  margin-top: 16px;

  Button {
    &:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }
  }
`;
const CommentListWrapper = styled.ul `
  padding: 0;
  margin-bottom: 64px;
`;
const CommentItemWrapper = styled.li `
  list-style-type: none;
`;
const NoCommentSection = styled.div `
  display: flex;
  justify-content: center;
  padding: 24px 0 48px;

  @media (max-width: 1200px) {
    padding: 40px 0 48px;
  }
`;
