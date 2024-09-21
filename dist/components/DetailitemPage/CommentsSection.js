import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { getProductsComments, postProductsComments, patchProductsComments, } from "../../api";
import { Title } from "./Detailitem";
import { Button } from "../AdditemPage/components/AdditemForm";
import styled from "styled-components";
import Comment from "./components/Comment";
import inquiryEmpty from "../../assets/images/img_inquiry_empty.svg";
const CommentsSection = ({ productId }) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    // 상품 댓글 조회
    useEffect(() => {
        if (!productId)
            return;
        const fetchProductsComments = async () => {
            // const params = { limit: 10 };
            try {
                const data = await getProductsComments(productId);
                setComments(data.list);
            }
            catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchProductsComments();
    }, [productId]);
    const onSubmit = async (content) => {
        const newComment = await postProductsComments(productId, content);
        setComments([...comments, newComment]);
    };
    const onDelete = (id) => {
        setComments(comments.filter((comment) => Number(comment.id) !== Number(id)));
    };
    const onUpdate = async (id, content) => {
        const updateComment = await patchProductsComments(productId, id, content);
        setComments(comments.map((comment) => Number(comment.id) === Number(id) ? updateComment : comment));
    };
    const handleChangeTextarea = (e) => {
        setCommentText(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (commentText) {
            onSubmit(commentText);
            setCommentText("");
        }
    };
    return (_jsxs("section", { className: "CommentsSection", children: [_jsxs("form", { className: "CommentsForm", onSubmit: handleSubmit, children: [_jsx(Title, { children: "\uBB38\uC758\uD558\uAE30" }), _jsx(Textarea, { height: "creat", name: "content", value: commentText, onChange: handleChangeTextarea, placeholder: "\uAC1C\uC778\uC815\uBCF4\uB97C \uACF5\uC720 \uBC0F \uC694\uCCAD\uD558\uAC70\uB098, \uBA85\uC608 \uD6FC\uC190, \uBB34\uB2E8 \uAD11\uACE0, \uBD88\uBC95 \uC815\uBCF4 \uC720\uD3EC\uC2DC \uBAA8\uB2C8\uD130\uB9C1 \uD6C4 \uC0AD\uC81C\uB420 \uC218 \uC788\uC73C\uBA70, \uC774\uC5D0 \uB300\uD55C \uBBFC\uD615\uC0AC\uC0C1 \uCC45\uC784\uC740 \uAC8C\uC2DC\uC790\uC5D0\uAC8C \uC788\uC2B5\uB2C8\uB2E4." }), _jsx(Button, { type: "submit", disabled: !commentText, children: "\uB4F1\uB85D" })] }), comments.length > 0 ? (_jsx(_Fragment, { children: comments &&
                    comments.map((comment) => (_jsx(Comment, { comment: comment, onUpdate: onUpdate, onDelete: onDelete }, comment.id))) })) : (_jsxs(EnquiryEmpty, { children: [_jsx("img", { src: inquiryEmpty, alt: "\uC544\uC9C1 \uBB38\uC758\uAC00 \uC5C6\uC5B4\uC694" }), _jsx("p", { children: "\uC544\uC9C1 \uBB38\uC758\uAC00 \uC5C6\uC5B4\uC694" })] }))] }));
};
export default CommentsSection;
const HEIGHT = {
    creat: 104,
    edit: 80,
};
export const Textarea = styled.textarea `
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
const EnquiryEmpty = styled.div `
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
