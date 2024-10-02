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

// InputItemProps 인터페이스 정의
// T는 react-hook-form에서 사용할 폼 필드 값의 타입을 일반화하기 위한 제너릭 타입
interface InputItemProps<T extends FieldValues> {
  id: Path<T>; // react-hook-form에서 사용되는 필드의 이름, SignupFormValues와 연결될 필드명 (예: "email", "nickname")
  label: string; // 필드에 표시할 레이블
  placeholder: string; // input 또는 textarea의 placeholder 값
  value?: string; // input 또는 textarea에 표시될 값 (컨트롤되지 않는 경우)
  errorMessage?: string; // 유효성 검사 실패 시 표시할 에러 메시지
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void; // 입력 값이 변경될 때 실행되는 함수
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void; // 키보드 입력 이벤트 핸들러
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // input 또는 textarea가 포커스를 잃었을 때 실행되는 함수
  isTextArea?: boolean; // textarea 사용 여부를 결정하는 플래그
  type?: string; // input의 타입, 기본값은 "text"
  register?: UseFormRegisterReturn; // react-hook-form의 register 메서드를 통해 제공되는 객체 (폼과 연결)
  setValue?: UseFormSetValue<T>; // react-hook-form의 setValue 메서드로 필드 값을 설정하는 함수
  trigger?: UseFormTrigger<T>; // react-hook-form의 trigger 메서드로 유효성 검사를 강제하는 함수
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
  type = "text", // 기본 input 타입은 "text"
  register,
  setValue,
  trigger,
}: InputItemProps<T>) => {
  // onBlur 이벤트 핸들러 (포커스를 잃었을 때 실행)
  // 입력 값을 다듬고, react-hook-form을 통한 값 설정 및 유효성 검사 실행
  const handleBlur = async (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const trimmedValue = event.target.value.trim(); // 입력 값의 앞뒤 공백 제거

    // setValue와 trigger가 전달된 경우, react-hook-form과 연결
    if (setValue && trigger) {
      setValue(id, trimmedValue as PathValue<T, Path<T>>); // 필드 값 설정 (SignupFormValues의 필드와 연동)
      await trigger(id); // 해당 필드의 유효성 검사 실행
    }

    // 사용자가 제공한 onBlur 함수가 있을 경우 호출
    if (onBlur) {
      onBlur(event);
    }
  };

  // onChange 이벤트 핸들러 (입력 값이 변경될 때 실행)
  // react-hook-form을 통한 값 설정과 사용자 정의 onChange 함수 실행
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (onChange) {
      onChange(e); // 외부에서 제공된 onChange 함수 호출
    }

    // setValue가 전달된 경우, react-hook-form과 연결하여 값 설정
    if (setValue) {
      setValue(id, e.target.value as PathValue<T, Path<T>>); // 필드 값 설정 (SignupFormValues의 필드와 연동)
    }
  };

  // register와 함께 사용하는 경우 react-hook-form과 연결된 이벤트 핸들러 제공
  const inputProps = register
    ? {
        ...register, // react-hook-form의 register에서 제공된 모든 속성 사용
        onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          register.onChange(e); // react-hook-form의 onChange 호출
          handleChange(e); // 사용자 정의 handleChange 호출
        },
        onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          register.onBlur(e); // react-hook-form의 onBlur 호출
          handleBlur(e); // 사용자 정의 handleBlur 호출
        },
      }
    : {
        value: value || "", // 외부에서 전달된 값이 없으면 빈 문자열 사용
        onChange: handleChange, // 사용자 정의 handleChange 호출
        onBlur: handleBlur, // 사용자 정의 handleBlur 호출
      };

  // input과 textarea에 공통적으로 적용되는 CSS 클래스
  const inputClasses = `
    w-full px-6 py-4 bg-gray-100 text-gray-800 border-none rounded-xl text-base leading-6
    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
  `;

  return (
    <div>
      {label && ( // 레이블이 있는 경우 렌더링
        <label
          htmlFor={String(id)} // id를 label의 for 속성에 전달
          className="block text-sm font-bold mb-3 sm:text-lg"
        >
          {label}
        </label>
      )}

      {isTextArea ? ( // isTextArea가 true인 경우 textarea 렌더링
        <textarea
          id={String(id)} // 필드 id 설정 (SignupFormValues의 필드 중 하나와 연동됨)
          placeholder={placeholder} // placeholder 설정
          className={`${inputClasses} h-50 resize-none`} // inputClasses와 textarea 전용 클래스 적용
          {...inputProps} // 이벤트 핸들러 및 기타 속성 전달
        />
      ) : (
        // 그 외의 경우 input 렌더링
        <input
          id={String(id)} // 필드 id 설정 (SignupFormValues의 필드 중 하나와 연동됨)
          onKeyDown={onKeyDown} // 외부에서 전달된 onKeyDown 이벤트 핸들러
          placeholder={placeholder} // placeholder 설정
          type={type} // input 타입 설정
          className={inputClasses} // inputClasses 적용
          {...inputProps} // 이벤트 핸들러 및 기타 속성 전달
        />
      )}

      {errorMessage && ( // 에러 메시지가 있을 경우 렌더링
        <span className="text-red-500 font-semibold text-sm leading-[18px] mt-2 block">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default InputItem;
