import {
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
} from './login.js';

const $signupForm = document.querySelector('#form-signup');
const $userName = document.querySelector('#name');
const $nameError = document.querySelector('.name-error');
const $userPasswordChk = document.querySelector('#password-check');
const $passwordChkError = document.querySelector('.password-error-chk');
const $openEyesChk = document.querySelector('.close-eyes.chk');
const $signupBtn = document.querySelector('#form-btn');

// 에러 메시지
const nameErrorMsg = {
  required: '닉네임을 입력해주세요.',
};
const passwordChkErrorMsg = {
  required: '비밀번호를 입력해주세요.',
  invalid: '비밀번호가 일치하지 않습니다.',
};

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

// 회원가입 버튼 비활성화
function disabledBtn() {
  if (
    !(
      $userEmail.value &&
      $userPassword.value &&
      $userPassword.value.length >= 8 &&
      emailValidChk($userEmail.value) &&
      $userPassword.value === $userPasswordChk.value
    )
  ) {
    $signupBtn.disabled = true;
    $signupBtn.classList.remove('disabled-none');
  } else {
    $signupBtn.disabled = false;
    $signupBtn.classList.add('disabled-none');
  }
}

// 비밀번호 확인 문자열 보이는 함수
function openEyesChk(e) {
  e.target.classList.toggle('open-eyes');
  if (this.classList.contains('open-eyes')) {
    $userPasswordChk.type = 'text';
  } else {
    $userPasswordChk.type = 'password';
  }
}

// 버튼 비활성화 이벤트
$userName.addEventListener('keyup', disabledBtn);
$userEmail.addEventListener('keyup', disabledBtn);
$userPassword.addEventListener('keyup', disabledBtn);
$userPasswordChk.addEventListener('keyup', disabledBtn);

// 에러 메시지 이벤트
$userName.addEventListener('focusout', checkName);
$userEmail.addEventListener('focusout', checkEmail);
$userPassword.addEventListener('focusout', checkPassword);
$userPasswordChk.addEventListener('focusout', checkPasswordChk);

// 비밀번호 확인 문자열 보이는 이벤트
$openEyesChk.addEventListener('click', openEyesChk);

// 회원가입 버튼 URL 이동 이벤트
$signupBtn.addEventListener('click', () => {
  $signupForm.submit();
});