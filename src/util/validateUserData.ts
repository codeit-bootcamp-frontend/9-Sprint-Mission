type UserData = {
  email: string;
  nickname?: string;
  password: string;
  passwordConfirmation?: string;
};

const validateUserData = (userData: UserData) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return {
    isValidEmail: emailRegex.test(userData.email),
    isValidPassword: userData.password.length >= 8,
    isValidNickName: (userData.nickname || "").trim().length > 0,
    isValidPasswordConfirm: userData.password === userData.passwordConfirmation,
  };
};

export default validateUserData;
