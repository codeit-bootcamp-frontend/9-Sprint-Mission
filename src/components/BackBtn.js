import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import styles from "./styles/BackBtn.module.css";
export function BackBtn() {
    return (_jsx(NavLink, { to: "/items", children: _jsx("div", { className: styles.buttonBox, children: _jsxs("button", { type: "button", className: styles.backBtn, children: ["\uBAA9\uB85D\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30", _jsx("div", { className: styles.backIcon })] }) }) }));
}
