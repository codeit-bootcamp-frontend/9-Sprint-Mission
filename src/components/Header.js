import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import logoImg from "../img/Property 1=lg.png";
import { NavLink } from "react-router-dom";
import "./App.css";
// 페이지 상단 header 컴포넌트
export function Header() {
    return (_jsx("nav", { className: "navbar", children: _jsxs("div", { className: "navbar-wrapper", children: [_jsx(NavLink, { to: "/", children: _jsx("img", { className: "logo", src: logoImg, alt: "\uD310\uB2E4\uB9C8\uCF13", width: "150", height: "50" }) }), _jsxs("div", { className: "category", children: [_jsx(NavLink, { to: "/", className: ({ isActive }) => (isActive ? "active" : ""), children: "\uC790\uC720\uAC8C\uC2DC\uD310" }), _jsx(NavLink, { to: "/items", className: ({ isActive }) => (isActive ? "active" : ""), children: "\uC911\uACE0\uB9C8\uCF13" })] }), _jsx(NavLink, { to: "/", children: _jsxs("button", { className: "my-profile-btn", children: [_jsx("div", { className: "blind", children: "\uB9C8\uC774 \uD504\uB85C\uD544" }), _jsx("div", { className: "my-profile" })] }) })] }) }));
}
