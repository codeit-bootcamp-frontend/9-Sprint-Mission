import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getReplyById } from "../api";
import styles from "../components/styles/ReplyList.module.css";
import { Kebab } from "./Kebab";
import { Dropdown } from "./Dropdown";
import { formatDate } from "../utils/formDate";
import { getHoursDiff } from "../utils/diffDate";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function ReplyList({ id, limit, cursor }) {
    const [replies, setReplies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const loadReplyList = () => __awaiter(this, void 0, void 0, function* () {
        setLoading(true);
        try {
            const replyObj = yield getReplyById({ id, limit, cursor });
            const replyList = replyObj.list;
            setReplies(replyList);
        }
        catch (err) {
            if (err instanceof Error)
                setError(err);
        }
        finally {
            setLoading(false);
            console.log(replies);
        }
    });
    useEffect(() => {
        loadReplyList();
    }, [id, limit]);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error.message] });
    }
    if (replies.length === 0) {
        return _jsx("div", { className: styles.noReplyBg });
    }
    return (_jsx("div", { className: styles.repliesWrapper, children: replies.map((reply, index) => (_jsx(Reply, { reply: reply }, index))) }));
}
// 개별 reply 컴포넌트
function Reply({ reply }) {
    const [isOpen, setIsOpen] = useState(false);
    const handleKebabClick = () => {
        setIsOpen(!isOpen);
        console.log(isOpen);
    };
    // 댓글 작성 시간
    const replyTime = () => {
        const diffHr = getHoursDiff(reply.createdAt);
        if (diffHr <= 24) {
            return `${diffHr}시간 전`;
        }
        return formatDate(reply.createdAt);
    };
    useEffect(() => { }, [reply]);
    return (_jsx(_Fragment, { children: _jsxs("div", { className: styles.replyItem, children: [_jsxs("div", { className: styles.replyContent, children: [reply.content, _jsx(Kebab, { onClick: handleKebabClick }), _jsx(Dropdown, { isOpen: isOpen })] }), _jsxs("div", { className: styles.replyWriter, children: [_jsx("div", { className: styles.sellerProfile, children: _jsx("img", { src: reply.writer.image, alt: "", width: "32", height: "32" }) }), _jsxs("div", { className: styles.replayWriterInfo, children: [_jsx("div", { className: styles.replyNickname, children: reply.writer.nickname }), _jsx("div", { className: styles.replyCreatedAt, children: replyTime() })] })] })] }) }));
}
