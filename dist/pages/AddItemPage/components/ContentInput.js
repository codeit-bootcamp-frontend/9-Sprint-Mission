import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import FileInput from "./FileInput";
function ContentInput({ name, value, onChange }) {
    return (_jsx(_Fragment, { children: _jsx(FileInput, { name: name, value: value, onChange: onChange }) }));
}
export default ContentInput;
