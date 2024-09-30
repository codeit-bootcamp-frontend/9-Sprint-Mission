// src/components/UI/InputItem.tsx
import { ChangeEvent, KeyboardEvent, FocusEvent } from "react";
import {
  FieldValues,
  UseFormRegisterReturn,
  UseFormSetValue,
  UseFormTrigger,
  Path,
  PathValue,
} from "react-hook-form";

interface InputItemProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  placeholder: string;
  value?: string;
  errorMessage?: string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextArea?: boolean;
  type?: string;
  register?: UseFormRegisterReturn;
  setValue?: UseFormSetValue<T>;
  trigger?: UseFormTrigger<T>;
}

const InputItem = <T extends FieldValues>({
  id,
  label,
  placeholder,
  value,
  onChange,
  onKeyDown,
  onBlur,
  isTextArea,
  errorMessage,
  type = "text",
  register,
  setValue,
  trigger,
}: InputItemProps<T>) => {
  const handleBlur = async (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const trimmedValue = event.target.value.trim();

    if (setValue && trigger) {
      setValue(id, trimmedValue as PathValue<T, Path<T>>);
      await trigger(id);
    }
    if (onBlur) {
      onBlur(event);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (onChange) {
      onChange(e);
    }
    if (setValue) {
      setValue(id, e.target.value as PathValue<T, Path<T>>);
    }
  };

  const inputProps = register
    ? {
        ...register,
        onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          register.onChange(e);
          handleChange(e);
        },
        onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          register.onBlur(e);
          handleBlur(e);
        },
      }
    : {
        value: value || "",
        onChange: handleChange,
        onBlur: handleBlur,
      };

  const inputClasses = `
    w-full px-6 py-4 bg-gray-100 text-gray-800 border-none rounded-xl text-base leading-6
    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
  `;

  return (
    <div>
      {label && (
        <label
          htmlFor={String(id)}
          className="block text-sm font-bold mb-3 sm:text-lg"
        >
          {label}
        </label>
      )}

      {isTextArea ? (
        <textarea
          id={String(id)}
          placeholder={placeholder}
          className={`${inputClasses} h-50 resize-none`}
          {...inputProps}
        />
      ) : (
        <input
          id={String(id)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          type={type}
          className={inputClasses}
          {...inputProps}
        />
      )}

      {errorMessage && (
        <span className="text-red-500 font-semibold text-sm leading-[18px] mt-2 block">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default InputItem;
