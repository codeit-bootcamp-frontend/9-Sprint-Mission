import { jsx as _jsx } from "react/jsx-runtime";
import AdditemForm from './components/AdditemForm';
const Additem = () => {
    return (_jsx("section", { className: "Additem", children: _jsx("div", { className: "container", children: _jsx(AdditemForm, {}) }) }));
};
export default Additem;
