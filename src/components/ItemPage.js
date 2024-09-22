import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import { ItemEach } from "./ItemEach";
import { Header } from "./Header";
import { ReplySubmit } from "./ReplySubmit";
import { ReplyList } from "./ReplyList";
import { BackBtn } from "./BackBtn";
export function ItemPage() {
    const { id } = useParams();
    if (id === undefined) {
        return _jsx("div", { children: "Error: ID is not available" });
    }
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs("main", { children: [_jsx(ItemEach, { id: id }), _jsx(ReplySubmit, { id: id }), _jsx(ReplyList, { id: id, limit: 10, cursor: 10 }), _jsx(BackBtn, {})] })] }));
}
