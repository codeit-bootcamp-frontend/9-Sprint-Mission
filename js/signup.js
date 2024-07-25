const $userName = document.querySelector('#name');
const $nameError = document.querySelector('.name-error');
const $userEmail = document.querySelector('#email');
const $emailError = document.querySelector('.email-error');
const $userPassword = document.querySelector('#password');
const $passwordError = document.querySelector('.password-error');
const $userPasswordChk = document.querySelector('#password-check');
const $passwordChkError = document.querySelector('.password-error-chk');
const $loginBtn = document.querySelector('#form-btn');

// 에러 메시지
const nameErrorMsg = {
  required: '닉네임을 입력해주세요.',
};
const emailErrorMsg = {
  required: '이메일을 입력해주세요.',
  invalid: '잘못된 이메일 형식입니다.',
};
const passwordErrorMsg = {
  required: '비밀번호를 입력해주세요.',
  invalid: '비밀번호를 8자 이상 입력해주세요.',
};
const passwordChkErrorMsg = {
  required: '비밀번호를 입력해주세요.',
  invalid: '비밀번호가 일치하지 않습니다.',
};

// 이메일 정규식 체크하는 함수
function emailValidChk(email) {
  const emailpasswordRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
  return emailpasswordRegex.test(email);
}

// 닉네임 함수
function checkName(e) {
  if ($userName.value === '') {
    e.target.classList.add('red');
    $nameError.innerHTML = nameErrorMsg.required;
  } else {
    e.target.classList.remove('red');
    $nameError.innerHTML = '';
  }
}

// 이메일 함수
function checkEmail(e) {
  if ($userEmail.value === '') {
    e.target.classList.add('red');
    $emailError.innerHTML = emailErrorMsg.required;
  } else if (!emailValidChk($userEmail.value)) {
    e.target.classList.add('red');
    $emailError.innerHTML = emailErrorMsg.invalid;
  } else {
    e.target.classList.remove('red');
    $emailError.innerHTML = '';
  }
}

// 비밀번호 함수
function checkPassword(e) {
  if ($userPassword.value === '') {
    e.target.classList.add('red');
    $passwordError.innerHTML = passwordErrorMsg.required;
  } else if ($userPassword.value.length < 8) {
    e.target.classList.add('red');
    $passwordError.innerHTML = passwordErrorMsg.invalid;
  } else {
    e.target.classList.remove('red');
    $passwordError.innerHTML = '';
  }
}

// 비밀번호 확인 함수
function checkPasswordChk(e) {
  if ($userPasswordChk.value === '') {
    e.target.classList.add('red');
    $passwordChkError.innerHTML = passwordChkErrorMsg.required;
  } else if ($userPasswordChk.value !== $userPassword.value) {
    e.target.classList.add('red');
    $passwordChkError.innerHTML = passwordChkErrorMsg.invalid;
  } else {
    e.target.classList.remove('red');
    $passwordChkError.innerHTML = '';
  }
}

// 버튼 비활성화
function disabledBtn() {
  if (!(
      $userEmail.value &&
      $userPassword.value &&
      $userPassword.value.length >= 8 &&
      emailValidChk($userEmail.value) &&
      $userName.value &&
      $userPassword.value === $userPasswordChk.value
    )) {
    $loginBtn.disabled = true;
    $loginBtn.classList.remove('disabled-none');
  } else {
    $loginBtn.disabled = false;
    $loginBtn.classList.add('disabled-none');
  }
}

// 회원가입 버튼 URL 이동
function signupUrl() {
  location.href = './signin.html';
}

// 버튼 비활성화 이벤트
$userName.addEventListener('keyup', disabledBtn);
$userEmail.addEventListener('keyup', disabledBtn);
$userPassword.addEventListener('keyup', disabledBtn);
$userPasswordChk.addEventListener('keyup', disabledBtn);

// input 포커스 이벤트
$userName.addEventListener('focusout', checkName);
$userEmail.addEventListener('focusout', checkEmail);
$userPassword.addEventListener('focusout', checkPassword);
$userPasswordChk.addEventListener('focusout', checkPasswordChk);

// 회원가입 클릭 이벤트
$loginBtn.addEventListener('click', signupUrl);