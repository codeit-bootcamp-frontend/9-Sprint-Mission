import { InputWithLabelProps } from "../types/input-with-label.types";
import "./input-with-label.css";

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="input-with-label">
      <label htmlFor={id}>{label}</label>
      <br />
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputWithLabel;
