import FileInput from "./FileInput";
import { FileInputProps } from "./FileInput";

export interface ContentProps extends FileInputProps {
  title: string;
}

function ContentInput({ name, value, onChange }: ContentProps) {
  return (
    <>
      <FileInput name={name} value={value} onChange={onChange} />
    </>
  );
}

export default ContentInput;
