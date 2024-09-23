import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemsPage from "./pages/ltemsPage/ItemsPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";
import GlobalStyle from "./styles/GlobalStyle";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
function App() {
    return (_jsxs(BrowserRouter, { children: [_jsx(GlobalStyle, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/items/:id?", element: _jsx(ItemsPage, {}) }), _jsx(Route, { path: "/additem", element: _jsx(AddItemPage, {}) })] })] }));
}
export default App;
