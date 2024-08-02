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

const noError = (input, errorNames) => {
  errorNames.forEach((errorName) => {
    const errorElement = document.getElementById(errorName);
    if (errorElement) {
      errorElement.style.display = 'none';
      input.style.border = 'none';
    }
  });
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
const checkSchema = (input, validators) => {
  noError(
    // 입력 필드의 오류 상태를 초기화
    input,
    validators.map((init) => init.errorName)
  );

  let isValid = true;

  for (const { condition, errorName } of validators) {
    if (!condition()) {
      isError(input, errorName);
      isValid = false;
      /*
        문제 : break가 없으면 validators 배열의 모든 조건을 검사하기 때문에
        emailEmptyError에러일 때 emailInvalidError에러까지 발생
        
        해결 : break 문을 사용하면 첫 번째 조건이 실패할 때 즉시 루프를 종료
      */
      break;
    }
  }

  return isValid;
};

const checkEmailSchema = () => {
  const email = emailInput.value.trim();
  isEmailValid = checkSchema(emailInput, [
    { condition: () => !!email, errorName: 'emailEmptyError' },
    { condition: () => validateEmail(email), errorName: 'emailInvalidError' },
  ]);
  updateButtonState();
};

const checkNicknameSchema = () => {
  const nickname = nicknameInput.value.trim();
  isNicknameValid = checkSchema(nicknameInput, [{ condition: () => !!nickname, errorName: 'nicknameEmptyError' }]);
  updateButtonState();
};

const checkPasswordSchema = () => {
  const password = passwordInput.value.trim();
  isPasswordValid = checkSchema(passwordInput, [
    { condition: () => !!password, errorName: 'passwordEmptyError' },
    { condition: () => password.length >= 8, errorName: 'passwordInvalidError' },
  ]);
  updateButtonState();
};

const checkPasswordRepeatSchema = () => {
  const passwordRepeat = passwordRepeatInput.value.trim();
  isPasswordRepeatValid = checkSchema(passwordRepeatInput, [
    { condition: () => !!passwordRepeat, errorName: 'passwordRepeatEmptyError' },
    { condition: () => passwordRepeat === passwordInput.value, errorName: 'passwordRepeatInvalidError' },
  ]);
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
