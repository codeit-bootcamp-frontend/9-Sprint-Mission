const passwordBoxes = document.querySelectorAll(".password-box");

passwordBoxes.forEach((e) => {
  const eyeButton = e.querySelector(".eye");
  const password = e.querySelector(".password");

  let isVisible = false;

  eyeButton.addEventListener("click", () => {
    if (isVisible) {
      password.setAttribute("type", "password");
      eyeButton.innerHTML =
        "<img src='images/eye_close.svg' class='eye-img' width='24px' height='24px' alt='eye'>"; // eye 아이콘으로 변경
    } else {
      password.setAttribute("type", "text");
      eyeButton.innerHTML =
        "<img src='images/eye_open.svg' class='eye-img' width='24px' height='24px' alt='eye-slash'>"; // eye-slash 아이콘으로 변경
    }
    isVisible = !isVisible;
  });
});

//이메일, 비밀번호 형식

const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");

function validateEmail(email) {
  return emailInput.checkValidity();
}

emailInput.addEventListener("focusout", () => {
  const emailValue = emailInput.value.trim();

  if (emailValue === "") {
    emailInput.classList.add("error");
    emailError.textContent = "이메일을 입력해주세요.";
    emailError.style.display = "block";
  } else if (!validateEmail(emailValue)) {
    emailInput.classList.add("error");
    emailError.textContent = "잘못된 이메일 형식입니다.";
    emailError.style.display = "block";
  }
  checkLoginValidation();
});

emailInput.addEventListener("focus", () => {
  emailInput.classList.remove("error");
  emailError.textContent = "";
  emailError.style.display = "none";
});

const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("password-error");

function validatePassword(password) {
  return password.length >= 8;
}

passwordInput.addEventListener("focusout", () => {
  const passwordValue = passwordInput.value.trim();

  if (passwordValue === "") {
    passwordInput.classList.add("error");
    passwordError.textContent = "비밀번호를 입력해주세요.";
    passwordError.style.display = "block";
  } else if (!validatePassword(passwordValue)) {
    passwordInput.classList.add("error");
    passwordError.textContent = "비밀번호를 8자 이상 입력해주세요.";
    passwordError.style.display = "block";
  }
  checkLoginValidation();
});

passwordInput.addEventListener("focus", () => {
  passwordInput.classList.remove("error");
  passwordError.textContent = "";
  passwordError.style.display = "none";
});

function checkLoginValidation() {
  const isEmailValid =
    emailInput.value.trim() !== "" && validateEmail(emailInput.value.trim());
  const isPasswordValid =
    passwordInput.value.trim() !== "" &&
    validatePassword(passwordInput.value.trim());

  if (isEmailValid && isPasswordValid) {
    loginButton.disabled = false;
    loginButton.classList.add("enabled");
  } else {
    loginButton.disabled = true;
    loginButton.classList.remove("enabled");
  }
}

const loginButton = document.getElementById("login-button");
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!loginButton.disabled) {
    window.location.href = "../items.html";
  }
});
