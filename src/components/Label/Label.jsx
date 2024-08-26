function Label({ category, title, name, placeholder, value, onChange }) {
  return (
    <>
      <label htmlFor={category} className="ItemForm-main-title">
        {title}
      </label>
      <input
        name={name}
        placeholder={placeholder}
        className="ItemForm-main-input"
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default Label;
