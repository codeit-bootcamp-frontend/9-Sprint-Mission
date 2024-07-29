const inputEmail = document.getElementById("email");
const inputNickName = document.getElementById("nick-name");
const inputPassword = document.getElementById("password");
const inputPasswordConfirm = document.getElementById("password-confirm");

const creatSpanEl = (input, text) => {
  input.nextElementSibling?.remove();

  input.classList.add("focus-out");
  const spanEl = document.createElement("span");
  spanEl.textContent = text;
  spanEl.classList.add("error-text");
  input.after(spanEl);
};

const checkInput = (input, validation) => {
  input.addEventListener("focusout", (e) => {
    validation(e.target);
  });
};



const emailValidation = (input) => {
  if(!input.value) {
    return creatSpanEl(input, '이메일을 입력해주세요.');
  }
  if (/^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+.[A-Za-z0-9-]+/.test(input.value) === false) {
    return creatSpanEl(input, '올바르지 않은 이메일입니다.');
  }
  
  input.classList.remove('focus-out');
  emailStaus = true

}

const nickNameValidation = (input) => {
  
  if(!input.value) {
    return creatSpanEl(input, '닉네임을 입력해주세요.');
  }
  if (input.value.length <= 3) {
    return creatSpanEl(input, '올바르지 않은 닉네임입니다.');
  }
  input.classList.remove('focus-out')
}

const passwordValidation = (input) => {
  if(!input.value) {
    
    return creatSpanEl(input, '비밀번호를 입력해주세요.');
  }
  console.log(input.value.length)
  if (input.value.length < 8) {
    
    return creatSpanEl(input, '비밀번호를 8자 이상 입력해주세요.');
  }
  input.classList.remove('focus-out')
}

const passwordMatchValidation = (input) => {
  if(!input.value) {
    
    return creatSpanEl(input, '비밀번호를 입력해주세요.');
  }
  if (input.value !== inputPassword.value ) {
    
    return creatSpanEl(input, '비밀번호가 일치하지 않습니다.');
  }
  input.classList.remove('focus-out')
}



checkInput(inputEmail,emailValidation);
checkInput(inputNickName,nickNameValidation);
checkInput(inputPassword,passwordValidation);
checkInput(inputPasswordConfirm,passwordMatchValidation);