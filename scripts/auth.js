const ValidStates = {
  isEmailValid: false,
  isPasswordValid: false,
  isPasswordCheckValid: false,
  isNickNameValid: false,
};

const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const nicknameError = document.getElementById("nickname-error");
const passwordCheckError = document.getElementById("password-check-error");

const passwordInput = document.getElementById("password");
const emailInput = document.getElementById("email");
const nicknameInput = document.getElementById("nickname");
const passwordCheckInput = document.getElementById("password-check");

const button = document.querySelector('.form button[type="submit"]');

// 이메일 형식 검증을 위한 정규 표현식 함수
function validateEmail(email) {
  const re = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
  return re.test(email);
}

function checkFormValid() {
  // 로그인 페이지에서 사용할 경우
  if (window.location.pathname.includes("login.html")) {
    return ValidStates.isEmailValid && ValidStates.isPasswordValid;
  }

  // 회원가입 페이지에서 사용할 경우
  if (window.location.pathname.includes("signup.html")) {
    return (
      ValidStates.isEmailValid &&
      ValidStates.isPasswordValid &&
      ValidStates.isPasswordCheckValid &&
      ValidStates.isNickNameValid
    );
  }

  return false;
}

function setError(element, errorElement, message, validStateKey) {
  element.style.border = "1px solid red";
  errorElement.style.display = "block";
  errorElement.innerHTML = message;
  ValidStates[validStateKey] = false;
}

function clearError(element, errorElement, validStateKey) {
  element.stlye.border = "";
  errorElement.style.display = "none";
  errorElement.innerHTML = "";
  ValidStates[validStateKey] = true;
}

function updateButtonState() {
  if (checkFormValid()) {
    button.disabled = false;
    button.style.cursor = "default";
  } else {
    button.disabled = true;
    button.style.cursor = "pointer";
  }
}

function move(event) {
  event.preventDefault();

  // 로그인 페이지일 경우 '/items'로 이동
  if (window.location.pathname.includes("login.html")) {
    window.location.href = "/items";
  }
  // 회원가입 페이지일 경우 '/signin'으로 이동
  else if (window.location.pathname.includes("signup.html")) {
    window.location.href = "/signin";
  }
}

function checkEmailValid() {
  const email = emailInput.value.trim();

  if (email === "") {
    setError(emailInput, emailError, "이메일을 입력해주세요.", "isEmailValid");
  } else if (!validateEmail(email)) {
    setError(
      emailInput,
      emailError,
      "잘못된 이메일 형식입니다.",
      "isEmailValid"
    );
  } else {
    clearError(emailInput, emailError, "isEmailValid");
  }

  updateButtonState();
}

function checkNicknameValid() {
  const nickname = nicknameInput.value.trim();

  if (nickname === "") {
    setError(
      nicknameInput,
      nicknameError,
      "닉네임을 입력해주세요.",
      "isNickNameValid"
    );
  } else {
    clearError(nicknameInput, nicknameError, "isNickNameValid");
  }

  updateButtonState();
}

function checkPasswordValid() {
  const password = passwordInput.value.trim();

  if (password === "") {
    setError(
      passwordInput,
      passwordError,
      "비밀번호를 입력해주세요.",
      "isPasswordValid"
    );
  } else if (password.length < 8) {
    setError(
      passwordInput,
      passwordError,
      "비밀번호를 8자 이상 입력해주세요.",
      "isPasswordValid"
    );
  } else {
    clearError(passwordInput, passwordError, "isPasswordValid");
  }

  updateButtonState();
}

function checkPasswordMatch() {
  const password = passwordInput.value.trim();
  const passwordMatch = passwordCheckInput.value.trim();

  if (!passwordMatch || password !== passwordMatch) {
    setError(
      passwordCheckInput,
      passwordCheckError,
      "비밀번호가 일치하지 않습니다.",
      "isPasswordCheckValid"
    );
  } else {
    clearError(passwordCheckInput, passwordCheckError, "isPasswordCheckValid");
  }

  updateButtonState();
}
// 실시간 비교를 위해 추가
passwordInput.addEventListener("input", checkPasswordMatch);
passwordCheckInput.addEventListener("input", checkPasswordMatch);

passwordInput.addEventListener("focusout", checkPasswordValid);
emailInput.addEventListener("focusout", checkEmailValid);
nicknameInput.addEventListener("focusout", checkNicknameValid);
passwordCheckInput.addEventListener("focusout", checkPasswordMatch);

button.addEventListener("click", move);

document.addEventListener("DOMContentLoaded", function () {
  button.disabled = true; // 초기 상태에서 버튼 비활성화
  button.style.cursor = "default";
});
