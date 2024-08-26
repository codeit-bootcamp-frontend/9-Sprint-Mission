import FileInput from "../FileInput/FileInput";

function LabelInput({ category, title, name, value, onChange }) {
  return (
    <>
      <label htmlFor={category} className="ItemForm-main-title">
        {title}
      </label>

      <FileInput name={name} value={value} onChange={onChange} />
    </>
  );
}

export default LabelInput;
