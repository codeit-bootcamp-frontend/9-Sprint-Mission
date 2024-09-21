import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from "react-dom/client";
import App from "./App";
const result = document.getElementById("root");
if (result) {
    const root = ReactDOM.createRoot(result);
    root.render(_jsx(App, {}));
}
