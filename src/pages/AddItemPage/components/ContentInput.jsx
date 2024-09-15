import FileInput from "./FileInput";

function ContentInput({ name, value, onChange }) {
  return (
    <>
      <FileInput name={name} value={value} onChange={onChange} />
    </>
  );
}

export default ContentInput;
