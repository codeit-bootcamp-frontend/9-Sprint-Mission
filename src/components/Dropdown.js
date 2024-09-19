import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "../components/styles/Dropdown.module.css";
export function Dropdown({ isOpen }) {
    return (_jsxs("div", { className: `${styles.dropdown} ${isOpen ? "" : styles.hidden}`, children: [_jsx("button", { type: "button", children: "\uC218\uC815\uD558\uAE30" }), _jsx("button", { type: "button", children: "\uC0AD\uC81C\uD558\uAE30" })] }));
}
