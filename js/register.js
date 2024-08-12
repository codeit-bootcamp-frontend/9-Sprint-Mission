import {
  inputEmail,
  inputNickName,
  inputPassword,
  inputPasswordConfirm,
  emailValidation,
  nickNameValidation,
  passwordValidation,
  passwordMatchValidation,
  checkInput,
} from "./function.js";



checkInput(inputEmail, emailValidation);
checkInput(inputNickName, nickNameValidation);
checkInput(inputPassword, passwordValidation);
checkInput(inputPasswordConfirm, passwordMatchValidation);
