import PropTypes from "prop-types";
import "./input-with-label.css";

const InputWithLabel = ({
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

InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default InputWithLabel;
