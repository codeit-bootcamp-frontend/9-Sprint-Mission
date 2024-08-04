const emailWrap = document.querySelector(".userEmail-wrap");
const emailInput = document.querySelector(".userEmail");
const passwordWrap = document.querySelector(".password-wrap");
const passwordInput = document.querySelector(".password");
const nickNameWrap = document.querySelector(".nickname-wrap");
const nickNameInput = document.querySelector(".nickName");
const passwordCheckWrap = document.querySelector(".password-check-wrap");
const passwordCheckInput = document.querySelector(".passwordCheck");
const loginButton = document.querySelector(".login-button");
const signupButton = document.querySelector(".signup-button");
let isEmailValid = false;
let isPasswordValid = false;
let isNickNameValid = false;
let isPasswordCheckValid = false;

// 이메일 형식 검증
const isValidationEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

// 비밀번호 길이 검증
const isPasswordTooShort = (password) => {
  return password.length > 7;
};

// 이메일 검증
emailInput.addEventListener("focusout", (e) => {
  const validationMessage = document.createElement("p");
  validationMessage.classList.add("warn-message");

  if (e.target.value == "") {
    emailInput.id = "warn-border";
    validationMessage.innerHTML = "이메일을 입력해주세요";
    emailWrap.appendChild(validationMessage);
  } else {
    isEmailValid = isValidationEmail(e.target.value);

    if (!isEmailValid) {
      emailInput.id = "warn-border";
      validationMessage.innerHTML = "잘못된 이메일 형식입니다";
      emailWrap.appendChild(validationMessage);
    }
  }
});

emailInput.addEventListener("focusin", () => {
  const validationMessage = document.querySelector(
    ".userEmail-wrap :nth-child(3)"
  );

  emailInput.removeAttribute("id");

  if (validationMessage !== null) {
    validationMessage.remove();
  }
});

// 비밀번호 검증
passwordInput.addEventListener("focusout", (e) => {
  const validationMessage = document.createElement("p");
  validationMessage.classList.add("warn-message");

  if (e.target.value == "") {
    passwordInput.id = "warn-border";
    validationMessage.innerHTML = "비밀번호를 입력해주세요";
    passwordWrap.appendChild(validationMessage);
  } else {
    isPasswordValid = isPasswordTooShort(e.target.value);

    if (!isPasswordValid) {
      passwordInput.id = "warn-border";
      validationMessage.innerHTML = "비밀번호를 8자 이상 입력해주세요";
      passwordWrap.appendChild(validationMessage);
    }
  }
});

passwordInput.addEventListener("focusin", () => {
  const validationMessage = document.querySelector(
    ".password-wrap :nth-child(3)"
  );

  passwordInput.removeAttribute("id");

  if (validationMessage !== null) {
    validationMessage.remove();
  }
});

// 닉네임 검증
nickNameInput.addEventListener("focusout", (e) => {
  const validationMessage = document.createElement("p");
  validationMessage.classList.add("warn-message");

  if (e.target.value == "") {
    nickNameInput.id = "warn-border";
    validationMessage.innerHTML = "닉네임을 입력해주세요";
    nickNameWrap.appendChild(validationMessage);
  } else {
    isNickNameValid = true;
  }
});

nickNameInput.addEventListener("focusin", () => {
  const validationMessage = document.querySelector(
    ".nickname-wrap :nth-child(3)"
  );

  nickNameInput.removeAttribute("id");

  if (validationMessage !== null) {
    validationMessage.remove();
  }
});

// 비밀번호 확인 검증
passwordCheckInput.addEventListener("focusout", (e) => {
  const validationMessage = document.createElement("p");
  validationMessage.classList.add("warn-message");

  if (e.target.value == "") {
    passwordCheckInput.id = "warn-border";
    validationMessage.innerHTML = "비밀번호를 입력해주세요";
    passwordCheckWrap.appendChild(validationMessage);
  } else {
    if (e.target.value !== passwordInput.value) {
      passwordCheckInput.id = "warn-border";
      validationMessage.innerHTML = "비밀번호가 일치하지 않습니다";
      passwordCheckWrap.appendChild(validationMessage);
    }
    isPasswordCheckValid = true;
  }
});

passwordCheckInput.addEventListener("focusin", () => {
  const validationMessage = document.querySelector(
    ".password-check-wrap :nth-child(3)"
  );

  passwordCheckInput.removeAttribute("id");

  if (validationMessage !== null) {
    validationMessage.remove();
  }
});

// 회원가입 버튼 활성화
emailInput.addEventListener("input", (e) => {
  isEmailValid = isValidationEmail(e.target.value);
  if (
    isEmailValid &&
    isPasswordValid &&
    isNickNameValid &&
    isPasswordCheckValid
  ) {
    signupButton.id = "login-button-active";
    signupButton.disabled = false;
  } else {
    signupButton.removeAttribute("id", "login-button-active");
    signupButton.disabled = true;
  }
});

passwordInput.addEventListener("input", (e) => {
  isPasswordValid = isPasswordTooShort(e.target.value);
  if (
    isEmailValid &&
    isPasswordValid &&
    isNickNameValid &&
    isPasswordCheckValid
  ) {
    signupButton.id = "login-button-active";
    signupButton.disabled = false;
  } else {
    signupButton.removeAttribute("id", "login-button-active");
    signupButton.disabled = true;
  }
});

nickNameInput.addEventListener("input", (e) => {
  isNickNameValid = e.target.value == "" ? false : true;
  if (
    isEmailValid &&
    isPasswordValid &&
    isNickNameValid &&
    isPasswordCheckValid
  ) {
    signupButton.id = "login-button-active";
    signupButton.disabled = false;
  } else {
    signupButton.removeAttribute("id", "login-button-active");
    signupButton.disabled = true;
  }
});

passwordCheckInput.addEventListener("input", (e) => {
  isPasswordCheckValid = e.target.value !== passwordInput.value ? false : true;
  if (
    isEmailValid &&
    isPasswordValid &&
    isNickNameValid &&
    isPasswordCheckValid
  ) {
    signupButton.id = "login-button-active";
    signupButton.disabled = false;
  } else {
    signupButton.removeAttribute("id", "login-button-active");
    signupButton.disabled = true;
  }
});

// eyeButton on/off
const eyeButtonOff = document.querySelector(".password-visiblity-button-off");
const passwordCheckEyeButtonOff = document.querySelector(
  ".password-check-visiblity-button-off"
);

eyeButtonOff.addEventListener("click", (e) => {
  e.preventDefault();

  eyeButtonOff.classList.toggle("password-visiblity-button-on");

  if (passwordInput.type === "password") {
    passwordInput.type = "";
  } else {
    passwordInput.type = "password";
  }
});

passwordCheckEyeButtonOff.addEventListener("click", (e) => {
  e.preventDefault();

  passwordCheckEyeButtonOff.classList.toggle(
    "password-check-visiblity-button-on"
  );

  if (passwordCheckInput.type === "password") {
    passwordCheckInput.type = "";
  } else {
    passwordCheckInput.type = "password";
  }
});
