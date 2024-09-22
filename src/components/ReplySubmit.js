import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./styles/ItemEachReply.module.css";
//useParam으로 가져온 id
export function ReplySubmit({ id }) {
    const [content, setContent] = useState("");
    /*
    const handleSubmitReply = (id) => {
      // 댓글 등록 api
      //if 댓글 등록 성공 시 인풋 초기화
      setContent("");
    };
  */
    const handleChangeReplyContent = (e) => {
        e.preventDefault();
        setContent(e.target.value);
    };
    return (_jsx(_Fragment, { children: _jsx("div", { children: _jsxs("form", { action: "#", className: styles.replyForm, children: [_jsx("label", { htmlFor: "reply", className: styles.replyLabel, children: "\uBB38\uC758\uD558\uAE30" }), _jsx("textarea", { id: "reply", className: styles.replyTextarea, value: content, onChange: handleChangeReplyContent, placeholder: "\uAC1C\uC778\uC815\uBCF4\uB97C \uACF5\uC720 \uBC0F \uC694\uCCAD\uD558\uAC70\uB098, \uBA85\uC608 \uD6FC\uC190, \uBB34\uB2E8 \uAD11\uACE0, \uBD88\uBC95 \uC815\uBCF4 \uC720\uD3EC\uC2DC \uBAA8\uB2C8\uD130\uB9C1 \uD6C4 \uC0AD\uC81C\uB420 \uC218 \uC788\uC73C\uBA70, \uC774\uC5D0 \uB300\uD55C \uBBFC\uD615\uC0AC\uC0C1 \uCC45\uC784\uC740 \uAC8C\uC2DC\uC790\uC5D0\uAC8C \uC788\uC2B5\uB2C8\uB2E4." }), _jsx("button", { className: styles.replySubmitBtn, disabled: content ? false : true, type: "submit", children: "\uB4F1\uB85D" })] }) }) }));
}
