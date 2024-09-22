import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Additem } from "./components/Additem";
import { ItemPage } from "./components/ItemPage";
function MainRouter() {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/items", replace: true }) }), _jsx(Route, { path: "/items", element: _jsx(App, {}) }), _jsx(Route, { path: "/items/:id", element: _jsx(ItemPage, {}) }), _jsx(Route, { path: "/additem", element: _jsx(Additem, {}) })] }) }));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(_jsx(React.StrictMode, { children: _jsx(MainRouter, {}) }));
