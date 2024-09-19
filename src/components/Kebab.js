import { jsx as _jsx } from "react/jsx-runtime";
import styles from "../components/styles/kebab.module.css";
export function Kebab({ onClick }) {
    return (_jsx("button", { type: "button", className: styles.kebabIcon, onClick: onClick }));
}
