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
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          id={forId}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className={className}
        />
      ) : (
        <input
          name={name}
          value={value}
          id={forId}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className={className}
        />
      )}
    </>
  );
}
