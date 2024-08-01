let isEmailValid = false;
let isNicknameValid = false;
let isPasswordValid = false;
let isPasswordRepeatValid = false;

const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nicknameInput = document.getElementById('nickname');
const passwordRepeatInput = document.getElementById('passwordRepeat');

const submitButton = document.querySelector('.auth-form-container button[type="submit"]');

const noError = (input, errorName) => {
  const errorElement = document.getElementById(errorName);
  if (errorElement) {
    errorElement.style.display = 'none';
    input.style.border = 'none';
  }
};

const isError = (input, errorName) => {
  const errorElement = document.getElementById(errorName);
  if (errorElement) {
    errorElement.style.display = 'block';
    input.style.border = '1px solid #f74747';
  }
};

// 버튼 활성화 검사
const updateButtonState = () => {
  let isFormValid = isEmailValid && isPasswordValid;

  if (signupForm) {
    isFormValid = isFormValid && isNicknameValid && isPasswordRepeatValid;
  }

  submitButton.disabled = !isFormValid;
};

const validateEmail = (email) => {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailRegex.test(email); // 정규식 테스트
};

const checkEmailSchema = () => {
  const email = emailInput.value.trim();

  isEmailValid = false;
  noError(emailInput, 'emailEmptyError');
  noError(emailInput, 'emailInvalidError');

  if (!email) {
    isError(emailInput, 'emailEmptyError');
  } else if (!validateEmail(email)) {
    isError(emailInput, 'emailInvalidError');
  } else {
    isEmailValid = true;
    noError(emailInput, 'emailEmptyError');
    noError(emailInput, 'emailInvalidError');
  }
  updateButtonState();
};

const checkNicknameSchema = () => {
  const nickname = nicknameInput.value.trim();

  isNicknameValid = false;
  noError(nicknameInput, 'nicknameEmptyError');

  if (!nickname) {
    isError(nicknameInput, 'nicknameEmptyError');
  } else {
    isNicknameValid = true;
    noError(nicknameInput, 'nicknameEmptyError');
  }
};

const checkPasswordSchema = () => {
  const password = passwordInput.value.trim();

  isPasswordValid = false;
  noError(passwordInput, 'passwordEmptyError');
  noError(passwordInput, 'passwordInvalidError');

  if (!password) {
    isError(passwordInput, 'passwordEmptyError');
  } else if (password.length < 8) {
    isError(passwordInput, 'passwordInvalidError');
  } else {
    isPasswordValid = true;
    noError(passwordInput, 'passwordEmptyError');
    noError(passwordInput, 'passwordInvalidError');
  }
  updateButtonState();
};

// 비밀번호 확인 유효성 검사
const checkPasswordRepeatSchema = () => {
  const passwordRepeat = passwordRepeatInput.value.trim();

  isPasswordRepeatValid = false;
  noError(passwordRepeatInput, 'passwordRepeatEmptyError');
  noError(passwordRepeatInput, 'passwordRepeatInvalidError');

  if (!passwordRepeat) {
    isError(passwordRepeatInput, 'passwordRepeatEmptyError');
  } else if (passwordRepeat !== passwordInput.value) {
    isError(passwordRepeatInput, 'passwordRepeatInvalidError');
  } else {
    isPasswordRepeatValid = true;
    noError(passwordRepeatInput, 'passwordRepeatEmptyError');
    noError(passwordRepeatInput, 'passwordRepeatInvalidError');
  }

  if (signupForm) {
    updateButtonState();
  }
};

// 눈 아이콘 토글
const togglePasswordVisibility = (event) => {
  const button = event.currentTarget;
  const inputField = button.parentElement.querySelector('input');
  const eyeIcon = button.querySelector('.toggle-password-icon');

  if (!eyeIcon) {
    console.error('Eye icon not found');
    return;
  }

  const isPasswordType = inputField.type === 'password';
  inputField.type = isPasswordType ? 'text' : 'password';

  eyeIcon.src = isPasswordType ? 'images/icons/eye-visible.svg' : 'images/icons/eye-invisible.svg';
  eyeIcon.alt = isPasswordType ? '비밀번호 표시 상태 아이콘' : '비밀번호 숨김 상태 아이콘';

  button.setAttribute('aria-label', isPasswordType ? '비밀번호 숨기기' : '비밀번호 보기');
};

// 눈 아이콘 '버튼' 클릭이벤트 호출
const eyeButtons = document.querySelectorAll('.toggle-password-button');
eyeButtons.forEach((button) => button.addEventListener('click', togglePasswordVisibility));

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // 기본 제출 동작 방지
    window.location.href = 'items.html';
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = 'signup.html';
  });
}

// 입력 필드에 이벤트 리스너 추가
if (emailInput) {
  emailInput.addEventListener('focusout', checkEmailSchema);
}
if (nicknameInput) {
  nicknameInput.addEventListener('focusout', checkNicknameSchema);
}
if (passwordInput) {
  passwordInput.addEventListener('focusout', checkPasswordSchema);
}
if (passwordRepeatInput) {
  passwordRepeatInput.addEventListener('focusout', checkPasswordRepeatSchema);
}
