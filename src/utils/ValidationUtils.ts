export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string) => {
  if (!email) return "이메일을 입력해주세요.";
  if (!emailPattern.test(email)) return "잘못된 이메일 형식입니다.";
  return "";
};

export const validatePassword = (password: string) => {
  if (!password) return "비밀번호를 입력해주세요.";
  if (password.length < 8) return "비밀번호를 8자 이상 입력해주세요.";
  return "";
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  if (password !== confirmPassword) return "비밀번호가 일치하지 않습니다.";
  return "";
};

export const validateName = (name: string) => {
  if (!name) return "닉네임을 입력해주세요.";
  return "";
};
