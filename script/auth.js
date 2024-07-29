const emailInput = document.querySelector('#email');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const pwdInput = document.querySelector('#password');
const errBox = document.querySelector('#error-msg');

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

// 이메일 & 비밀번호 호출
emailInput.addEventListener('focusout',validateEmail);
pwdInput.addEventListener('focusout',validatePwd);

// 비활성화
document.querySelector('form').addEventListener('submit', function(e){
  const inputBox = document.querySelectorAll('.form_input');
  inputBox.forEach((el) => {
    if (el.value == '' || errBox.innerText != '' || pwdInput.value.length < 8){
      e.preventDefault();
    }
  });
});
