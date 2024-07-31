const emailInput = document.querySelector('#email');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const pwdInput = document.querySelector('#password');
const errBox = document.querySelector('#error-msg');
const nameInput = document.querySelector('#name');
const pwdInputChk = document.querySelector('#chk-password');

// 이메일 & 비밀번호 제어
function validateInput (inputId , errMsg){
  inputId.classList.add('input-error');
  inputId.closest('div').querySelector('#error-msg').textContent = errMsg;
}

function validateInputremove (inputId){
  inputId.classList.remove('input-error');
  inputId.closest('div').querySelector('#error-msg').textContent = '';
}

// 이메일 조건부
function validateEmail(){
  if (emailInput.value === ''){
    validateInput (emailInput, '이메일을 입력해주세요.');
  } else if (!emailPattern.test(emailInput.value)) {
    validateInput (emailInput, '잘못된 이메일 형식입니다.');
  } else {
    validateInputremove(emailInput);
  }
}

// 비밀번호 조건부
function validatePwd(){
  if (pwdInput.value === ''){
    validateInput (pwdInput, '비밀번호를 입력해주세요.');
  } else if (pwdInput.value.length < 8) {
    validateInput (pwdInput, '비밀번호를 8자 이상 입력해주세요.');
  } else {
    validateInputremove (pwdInput);
  }
}

// 비밀번호 확인
function validatePwdChk(){
  if (pwdInput.value !== pwdInputChk.value){
    validateInput (pwdInputChk, '비밀번호가 일치하지 않습니다.');
  } else {
    validateInputremove (pwdInputChk);
  }
}

// 닉네임 조건부
function validateName(){
  if (nameInput.value === ''){
    validateInput (nameInput, '닉네임을 입력해주세요.');
  } else {
    validateInputremove (nameInput);
  }
}

// 비밀번호 노출 제어
 document.querySelectorAll('.pwd_icon').forEach(pwdIcon => {
  pwdIcon.addEventListener('click', function(e) {
    const pwdIcon = e.currentTarget;
    const pwdIconImg = pwdIcon.querySelector('img');
    const pwdWrapper = pwdIcon.closest('.pwd-wrapper');
    const passwordInput = pwdWrapper.querySelector('.form_input');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        pwdIconImg.src = './images/icon/ic_pwd_variant.png';
    } else {
        passwordInput.type = 'password';
        pwdIconImg.src = './images/icon/ic_pwd_default.png';
    }
  });
});

// 버튼 비활성화
document.querySelector('form').addEventListener('submit', function(e){
  const inputBox = document.querySelectorAll('.form_input');
  inputBox.forEach((el) => {
    if (el.value == '' || errBox.innerText != '' || pwdInput.value.length < 8){
      e.preventDefault();
    }
  });
});

// 이메일 & 비밀번호 & 비밀번호 확인 & 닉네임 호출
emailInput.addEventListener('focusout',validateEmail);
pwdInput.addEventListener('focusout',validatePwd);
pwdInputChk.addEventListener('focusout',validatePwdChk);
nameInput.addEventListener('focusout',validateName);