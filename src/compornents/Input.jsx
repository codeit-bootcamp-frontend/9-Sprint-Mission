export default function Input({
  forId,
  value,
  placeholder,
  name,
  title,
  type,
  onChange,
  onKeyDown,
  className,
}) {
  return (
    <>
      <label htmlFor={forId} className={className}>
        {title}
      </label>
      <input
        name={name}
        value={value}
        id={forId}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </>
  );
}
