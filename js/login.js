const $loginForm = document.querySelector('#form-login');
const $userEmail = document.querySelector('#email');
const $emailError = document.querySelector('.email-error');
const $userPassword = document.querySelector('#password');
const $passwordError = document.querySelector('.password-error');
const $closeEyes = document.querySelector('.close-eyes');
const $loginBtn = document.querySelector('#form-btn');

// 에러 메시지
const emailErrorMsg = {
  required: '이메일을 입력해주세요.',
  invalid: '잘못된 이메일 형식입니다.',
};
const passwordErrorMsg = {
  required: '비밀번호를 입력해주세요.',
  invalid: '비밀번호를 8자 이상 입력해주세요.',
};

// 이메일 정규식 체크하는 함수
function emailValidChk(email) {
  const emailpasswordRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
  return emailpasswordRegex.test(email);
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

// 비밀번호 문자열 보이는 함수
function openEyes(e) {
  e.target.classList.toggle('open-eyes');
  if (this.classList.contains('open-eyes')) {
    $userPassword.type = 'text';
  } else {
    $userPassword.type = 'password';
  }
}

// 로그인 버튼 비활성화
function disabledBtn() {
  if (!(
      $userEmail.value &&
      $userPassword.value &&
      $userPassword.value.length >= 8 &&
      emailValidChk($userEmail.value)
    )) {
    $loginBtn.disabled = true;
    $loginBtn.classList.remove('disabled-none');
  } else {
    $loginBtn.disabled = false;
    $loginBtn.classList.add('disabled-none');
  }
}

// 로그인 버튼 비활성화 이벤트
$userEmail.addEventListener('keyup', disabledBtn);
$userPassword.addEventListener('keyup', disabledBtn);

// 에러 메시지 이벤트
$userEmail.addEventListener('focusout', checkEmail);
$userPassword.addEventListener('focusout', checkPassword);

// 비밀번호 문자열 보이는 이벤트
$closeEyes.addEventListener('click', openEyes);

// 로그인 버튼 URL 이동 이벤트
$loginBtn.addEventListener('click', () => {
  $loginForm.submit();
});

export {
  $userEmail,
  $emailError,
  $userPassword,
  $passwordError,
  $closeEyes,
  emailErrorMsg,
  passwordErrorMsg,
  emailValidChk,
  checkEmail,
  checkPassword,
  openEyes,
  disabledBtn
};