
const ValidStates = {
  isEmailValid : false,
  isPassworValid : false,
  isPasswordCheckValid : false,
  isNickNameVlaid : false
}

const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const passwordInput = document.getElementById("password");
const emailInput = document.getElementById("email");

// 이메일 형식 검증을 위한 정규 표현식 함수
function validateEmail(email) {
  const re = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  return re.test(email);
}

function checkFormValid() {
  for (value in ValidStates )
}
// 이메일 유효성 검사 함수
function checkEmailValid() {
  const email = emailInput.value.trim();

  if (email === "") {
    emailInput.style.border = "1px solid red";
    emailError.style.display = "block";
    emailError.innerHTML = "이메일을 입력해주세요.";
  } else if (!validateEmail(email)) {
    emailError.innerHTML = "잘못된 이메일 형식입니다.";
    emailError.style.display = "block";
    emailInput.style.border = "1px solid red";
  } else {
    emailInput.style.border = "";
    emailError.style.display = "none";
    emailError.innerHTML = "";
  }
}

// 비밀번호 유효성 검사 함수
function checkPasswordValid() {
  const password = passwordInput.value.trim();

  if (password === "") {
    passwordInput.style.border = "1px solid red";
    passwordError.style.display = "block";
    passwordError.innerHTML = "비밀번호를 입력해주세요.";
  } else if (password.length < 8) {
    passwordInput.style.border = "1px solid red";
    passwordError.style.display = "block";
    passwordError.innerHTML = "비밀번호를 8자 이상 입력해주세요.";
  } else {
    passwordInput.style.border = "";
    passwordError.style.display = "none";
    passwordError.innerHTML = "";
  }
}

passwordInput.addEventListener("focusout", checkPasswordValid);
emailInput.addEventListener("focusout", checkEmailValid);
