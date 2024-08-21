import PropTypes from "prop-types";
import "./textarea-with-label.css";

const TextareaWithLabel = ({ id, label, value, onChange, placeholder }) => {
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

TextareaWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default TextareaWithLabel;
