// 유효성 검사 초기 상태 값
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

const noError = (input, errorElement) => {
  if (errorElement) {
    errorElement.style.display = 'none';
    input.style.border = 'none';
  }
};

const isError = (input, errorElement, errorMessage) => {
  if (errorElement) {
    errorElement.style.display = 'block';
    errorElement.textContent = errorMessage;
    input.style.border = '1px solid #f74747';
  }
};

// 버튼 비활성화 함수
const updateButtonState = () => {
  let isFormValid = isEmailValid && isPasswordValid;

  if (signupForm) {
    isFormValid = isFormValid && isNicknameValid && isPasswordRepeatValid;
  }

  submitButton.disabled = !isFormValid;
};

// 이메일 정규식
const validateEmail = (email) => /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email);

// 유효성 검사 공통 코드
const checkSchema = (input, validators, errorElement) => {
  noError(input, errorElement);

  let isValid = true;

  for (const { condition, errorMessage } of validators) {
    if (!condition()) {
      isError(input, errorElement, errorMessage);
      isValid = false;
      break;
    }
  }

  return isValid;
};

const checkEmailSchema = () => {
  const email = emailInput.value.trim();
  const emailErrorElement = document.getElementById('emailError');
  isEmailValid = checkSchema(
    emailInput,
    [
      { condition: () => !!email, errorMessage: '이메일을 입력해 주세요' },
      { condition: () => validateEmail(email), errorMessage: '잘못된 이메일 형식입니다' },
    ],
    emailErrorElement
  );
  updateButtonState();
};

const checkNicknameSchema = () => {
  const nickname = nicknameInput.value.trim();
  const nicknameErrorElement = document.getElementById('nicknameError');
  isNicknameValid = checkSchema(nicknameInput, [{ condition: () => !!nickname, errorMessage: '닉네임을 입력해 주세요' }], nicknameErrorElement);
  updateButtonState();
};

const checkPasswordSchema = () => {
  const password = passwordInput.value.trim();
  const passwordErrorElement = document.getElementById('passwordError');
  isPasswordValid = checkSchema(
    passwordInput,
    [
      { condition: () => !!password, errorMessage: '비밀번호를 입력해 주세요' },
      { condition: () => password.length >= 8, errorMessage: '비밀번호는 8자 이상이어야 합니다' },
    ],
    passwordErrorElement
  );
  updateButtonState();
};

const checkPasswordRepeatSchema = () => {
  const passwordRepeat = passwordRepeatInput.value.trim();
  const passwordRepeatErrorElement = document.getElementById('passwordRepeatError');
  isPasswordRepeatValid = checkSchema(
    passwordRepeatInput,
    [
      { condition: () => !!passwordRepeat, errorMessage: '비밀번호 확인을 입력해 주세요' },
      { condition: () => passwordRepeat === passwordInput.value, errorMessage: '비밀번호가 일치하지 않습니다' },
    ],
    passwordRepeatErrorElement
  );
  updateButtonState();
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
emailInput?.addEventListener('focusout', checkEmailSchema);
nicknameInput?.addEventListener('focusout', checkNicknameSchema);
passwordInput?.addEventListener('focusout', checkPasswordSchema);
passwordRepeatInput?.addEventListener('focusout', checkPasswordRepeatSchema);
