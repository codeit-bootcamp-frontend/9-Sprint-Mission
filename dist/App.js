import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/LoginPage/Login";
import Signup from "./components/LoginPage/Signup";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage/HomePage";
import Product from "./components/ProductPage/Product";
import Community from "./components/CommunityPage/Community";
import Additem from "./components/AdditemPage/Additem";
import Detailitem from "./components/DetailitemPage/Detailitem";
import Notfound from "./components/Notfound";
import "./assets/styles/App.scss";
function App() {
    return (_jsx(BrowserRouter, { children: _jsxs("div", { className: "App", children: [_jsx(Header, {}), _jsxs(Routes, { children: [_jsx(Route, { index: true, element: _jsx(HomePage, {}) }), _jsx(Route, { path: "login", element: _jsx(Login, {}) }), _jsx(Route, { path: "signup", element: _jsx(Signup, {}) }), _jsx(Route, { path: "items", element: _jsx(Product, {}) }), _jsx(Route, { path: "items/:productId", element: _jsx(Detailitem, {}) }), _jsx(Route, { path: "additem", element: _jsx(Additem, {}) }), _jsx(Route, { path: "community", element: _jsx(Community, {}) }), _jsx(Route, { path: "*", element: _jsx(Notfound, {}) })] }), _jsx(Footer, {})] }) }));
}
export default App;
