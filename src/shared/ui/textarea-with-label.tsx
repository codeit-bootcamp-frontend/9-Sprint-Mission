import "./textarea-with-label.css";
import { TextareaWithLabelProps } from "../types/textarea-with-label";

const TextareaWithLabel = ({
  id,
  label,
  value,
  onChange,
  placeholder,
}: TextareaWithLabelProps) => {
  return (
    <div className="textarea-with-label">
      <label htmlFor={id}>{label}</label>
      <br />
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextareaWithLabel;
