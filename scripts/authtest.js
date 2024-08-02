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
const checkSchema = (input, validators, errorNames) => {
  let isValid = false;

  for (let i = 0; i < validators.length; i++) {
    const validator = validators[i];
    const errorName = errorNames[i];

    if (!validator(input.value)) {
      isError(input, errorName);

      // 입력이 비어 있는 경우, 다른 오류 메시지를 생략
      if (errorName.includes('EmptyError')) {
        break;
      }
    } else {
      noError(input, errorName);
      isValid = true;
    }
  }

  return isValid;
};

const checkEmailSchema = () => {
  isEmailValid = checkSchema(emailInput, [(value) => value !== '', validateEmail], ['emailEmptyError', 'emailInvalidError']);
  updateButtonState();
};

const checkNicknameSchema = () => {
  isNicknameValid = checkSchema(nicknameInput, [(value) => value !== ''], ['nicknameEmptyError']);
  updateButtonState();
};

const checkPasswordSchema = () => {
  isPasswordValid = checkSchema(passwordInput, [(value) => value !== '', (value) => value.length >= 8], ['passwordEmptyError', 'passwordInvalidError']);
  updateButtonState();
};

// 비밀번호 확인 유효성 검사
const checkPasswordRepeatSchema = () => {
  isPasswordRepeatValid = checkSchema(passwordRepeatInput, [(value) => value !== '', (value) => value === passwordInput.value], ['passwordRepeatEmptyError', 'passwordRepeatInvalidError']);
  updateButtonState();
};

// 눈 아이콘 토글
const togglePasswordVisibility = (event) => {
  const button = event.currentTarget;
  const inputField = button.parentElement.querySelector('input');
  const eyeIcon = button.querySelector('.toggle-password-icon');

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
    window.location.href = 'items.html'; // 폼 제출 후 특정 페이지로 리디렉션
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = 'signup.html';
  });
}

// 버튼 초기 비활성화
updateButtonState();

// 입력 필드에 이벤트 리스너 추가
emailInput?.addEventListener('focusout', checkEmailSchema);
nicknameInput?.addEventListener('focusout', checkNicknameSchema);
passwordInput?.addEventListener('focusout', checkPasswordSchema);
passwordRepeatInput?.addEventListener('focusout', checkPasswordRepeatSchema);
