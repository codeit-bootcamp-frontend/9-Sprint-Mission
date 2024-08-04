const emailWrap = document.querySelector(".userEmail-wrap");
const emailInput = document.querySelector(".userEmail");
const passwordWrap = document.querySelector(".password-wrap");
const passwordInput = document.querySelector(".password");
const loginButton = document.querySelector(".login-button");
let isEmailValid = false;
let isPasswordValid = false;

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

// 로그인 버튼 활성화
emailInput.addEventListener("input", (e) => {
  isEmailValid = isValidationEmail(e.target.value);
  if (isEmailValid && isPasswordValid) {
    loginButton.id = "login-button-active";
    loginButton.disabled = false;
  } else if (isEmailValid || isPasswordValid) {
    loginButton.removeAttribute("id", "login-button-active");
    loginButton.disabled = true;
  }
});

passwordInput.addEventListener("input", (e) => {
  isPasswordValid = isPasswordTooShort(e.target.value);
  if (isEmailValid && isPasswordValid) {
    loginButton.id = "login-button-active";
    loginButton.disabled = false;
  } else if (isEmailValid || isPasswordValid) {
    loginButton.removeAttribute("id", "login-button-active");
    loginButton.disabled = true;
  }
});

// eyeButton on/off
const eyeButtonOff = document.querySelector(".password-visiblity-button-off");

eyeButtonOff.addEventListener("click", () => {
  eyeButtonOff.classList.toggle("password-visiblity-button-on");

  if (passwordInput.type === "password") {
    passwordInput.type = "";
  } else {
    passwordInput.type = "password";
  }
});
