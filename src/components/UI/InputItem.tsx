// src/components/UI/InputItem.tsx
import { ChangeEvent, KeyboardEvent, FocusEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

// InputItemProps 인터페이스 정의
interface InputItemProps {
  id: string; // 필드의 이름
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
  min?: number; // 숫자 입력에 사용할 최소값 (type="number"일 때만 사용)
  max?: number; // 숫자 입력에 사용할 최대값 (type="number"일 때만 사용)
  step?: number; // 숫자 입력에 사용할 스텝 값 (type="number"일 때만 사용)
}

const InputItem = ({
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
  min,
  max,
  step,
}: InputItemProps) => {
  // onBlur 이벤트 핸들러
  const handleBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (onBlur) {
      onBlur(event); // 외부에서 전달된 onBlur 함수 호출
    }
  };

  // onChange 이벤트 핸들러
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (onChange) {
      onChange(e); // 외부에서 전달된 onChange 함수 호출
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
          htmlFor={id} // id를 label의 for 속성에 전달
          className="block text-sm font-bold mb-3 sm:text-lg"
        >
          {label}
        </label>
      )}

      {isTextArea ? ( // isTextArea가 true인 경우 textarea 렌더링
        <textarea
          id={id} // 필드 id 설정
          placeholder={placeholder} // placeholder 설정
          className={`${inputClasses} h-50 resize-none`} // inputClasses와 textarea 전용 클래스 적용
          {...inputProps} // 이벤트 핸들러 및 기타 속성 전달
        />
      ) : (
        // 그 외의 경우 input 렌더링
        <input
          id={id} // 필드 id 설정
          onKeyDown={onKeyDown} // 외부에서 전달된 onKeyDown 이벤트 핸들러
          placeholder={placeholder} // placeholder 설정
          type={type} // input 타입 설정
          min={type === "number" ? min : undefined} // type이 "number"일 때 min 속성 전달
          max={type === "number" ? max : undefined} // type이 "number"일 때 max 속성 전달
          step={type === "number" ? step : undefined} // type이 "number"일 때 step 속성 전달
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
