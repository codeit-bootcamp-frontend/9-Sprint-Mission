import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import BestProduct from "./components/BestProduct";
import AllProduct from "./components/AllProduct";
const Product = () => {
    return (_jsx("section", { className: "Product", children: _jsxs("div", { className: "container", children: [_jsx(BestProduct, {}), _jsx(AllProduct, {})] }) }));
};
export default Product;
