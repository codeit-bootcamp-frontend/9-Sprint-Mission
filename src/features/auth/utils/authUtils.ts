// 공통 InputId 타입
export type AuthInputId =
  | "email"
  | "nickname"
  | "password"
  | "passwordConfirmation";

// 이메일 유효성 검사 함수
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

// 오류 메시지를 반환하는 함수
export const getErrorMessage = (
  type: AuthInputId,
  value: string,
  password?: string
): string => {
  const trimmedValue = value.trim();

  switch (type) {
    case "email":
      if (!trimmedValue) return "이메일을 입력해 주세요";
      if (!isValidEmail(trimmedValue)) return "잘못된 이메일 형식입니다";
      return "";

    case "nickname":
      return trimmedValue ? "" : "닉네임을 입력해 주세요";

    case "password":
      if (!trimmedValue) return "비밀번호를 입력해 주세요";
      if (trimmedValue.length < 8) return "비밀번호를 8자 이상 입력해 주세요";
      return "";

    case "passwordConfirmation":
      if (!trimmedValue) return "비밀번호 확인을 입력해 주세요";
      if (trimmedValue !== password) return "비밀번호가 일치하지 않습니다";
      return "";

    default:
      return "";
  }
};
