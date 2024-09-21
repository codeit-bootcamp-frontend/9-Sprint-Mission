import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useReducer } from "react";
import Navbar from "../../components/Navbar";
import ItemForm from "./components/ItemForm";
import { Container } from "../../styles/Container";
const INITIAL_VALUES = {
    imgFile: null,
    title: "",
    content: "",
    price: "",
    tags: [],
};
function reducer(state, action) {
    switch (action.type) {
        case "CHANGE_VALUE":
            return { ...state, [action.name]: action.value };
        case "CHANGE_TAGS":
            return { ...state, tags: action.tags };
        case "RESET":
            return INITIAL_VALUES;
        default:
            return state;
    }
}
function AddItemPage() {
    const [values, dispatch] = useReducer(reducer, INITIAL_VALUES);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: "CHANGE_VALUE", name, value });
    };
    const handleFileChange = (name, file) => {
        dispatch({ type: "CHANGE_VALUE", name, value: file });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        dispatch({ type: "RESET" });
    };
    const handleTagChange = (updatedItems) => {
        dispatch({ type: "CHANGE_TAGS", tags: updatedItems });
    };
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx(Container, { children: _jsx(ItemForm, { values: values, handleFileChange: handleFileChange, handleInputChange: handleInputChange, handleTagChange: handleTagChange, onSubmit: handleSubmit }) })] }));
}
export default AddItemPage;
