const nicknameInput = document.getElementById("nickname");
const nickError = document.getElementById("nickname-error");

nicknameInput.addEventListener("focusout", () => {
  const nicknameValue = nicknameInput.value.trim();

  if (nicknameValue === "") {
    nicknameInput.classList.add("error");
    nickError.textContent = "닉네임을 입력해주세요.";
    nickError.style.display = "block";
  }

  checkSignupValidation();
});

nicknameInput.addEventListener("focus", () => {
  nicknameInput.classList.remove("error");
  nickError.textContent = "";
  nickError.style.display = "none";
});

const passwordConfirmInput = document.getElementById("password-confirm");
const passwordConfirmError = document.getElementById("password-confirm-error");

function validatePasswordConfirm() {
  return passwordInput.value.trim() === passwordConfirmInput.value.trim();
}

passwordConfirmInput.addEventListener("focusout", () => {
  const passwordValue = passwordInput.value.trim();
  const passwordConfirmValue = passwordConfirmInput.value.trim();

  if (!validatePasswordConfirm() && passwordValue !== "") {
    passwordConfirmInput.classList.add("error");
    passwordConfirmError.textContent = "비밀번호가 일치하지 않습니다..";
    passwordConfirmError.style.display = "block";
  } else if (passwordConfirmValue === "") {
    passwordConfirmInput.classList.add("error");
    passwordConfirmError.textContent = "비밀번호를 입력해주세요.";
    passwordConfirmError.style.display = "block";
  } else if (!validatePassword(passwordConfirmValue)) {
    passwordConfirmInput.classList.add("error");
    passwordConfirmError.textContent = "비밀번호를 8자 이상 입력해주세요.";
    passwordConfirmError.style.display = "block";
  }

  checkSignupValidation();
});

passwordConfirmInput.addEventListener("focus", () => {
  passwordConfirmInput.classList.remove("error");
  passwordConfirmError.textContent = "";
  passwordConfirmError.style.display = "none";
});

const passwordButton = document.getElementById("password-button");

function checkSignupValidation() {
  const isEmailValid =
    emailInput.value.trim() !== "" && validateEmail(emailInput.value.trim());
  const isNicknameValid = nicknameInput.value.trim() !== "";
  const isPasswordValid =
    passwordInput.value.trim() !== "" &&
    validatePassword(passwordInput.value.trim());
  const isPasswordComfirmValid =
    passwordConfirmInput.value.trim() !== "" && validatePasswordConfirm();

  if (
    isEmailValid &&
    isPasswordValid &&
    isNicknameValid &&
    isPasswordComfirmValid
  ) {
    passwordButton.disabled = false;
    passwordButton.classList.add("enabled");
  } else {
    passwordButton.disabled = true;
    passwordButton.classList.remove("enabled");
  }
}

const passwordForm = document.getElementById("password-form");
passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!passwordButton.disabled) {
    window.location.href = "../signin.html";
  }
});
