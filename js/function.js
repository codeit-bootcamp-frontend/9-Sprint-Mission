const inputEmail = document.getElementById("email");
const inputNickName = document.getElementById("nick-name");
const inputPassword = document.getElementById("password");
const inputPasswordConfirm = document.getElementById("password-confirm");

//에러메세지 출력하는 span요소 만들기
const creatSpanEl = (input, text) => {
  input.nextElementSibling?.remove();
  input.classList.add("focus-out");
  const spanEl = document.createElement("span");
  spanEl.textContent = text;
  spanEl.classList.add("error-text");
  input.after(spanEl);
};

// 이벤트가 발생한 인풋을 체크
const checkInput = (input, validation) => {
  input.addEventListener("focusout", () => {
    validation(input);
    submitState();
  });
};

let emailState = false;
let passwordState = false;
let nickNameState = false;
let passwordConfirmState = false;

//이메일 유효성 검사
const emailValidation = (input) => {
  if (!input.value) {
    emailState = false;
    console.log(emailState);
    return creatSpanEl(input, "이메일을 입력해주세요.");
  }
  if (
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(input.value) ===
    false
  ) {
    emailState = false;
    return creatSpanEl(input, "잘못된 이메일 형식입니다.");
  }
  input.classList.remove("focus-out");
  input.nextElementSibling?.remove();
  emailState = true;
};

//닉네임 유효성 검사
const nickNameValidation = (input) => {
  if (!input.value) {
    nickNameState = false;
    return creatSpanEl(input, "닉네임을 입력해주세요.");
  }
  input.classList.remove("focus-out");
  input.nextElementSibling?.remove();
  nickNameState = true;
};

//비밀번호 유효성 검사
const passwordValidation = (input) => {
  if (!input.value) {
    passwordState = false;
    return creatSpanEl(input, "비밀번호를 입력해주세요.");
  }
  if (input.value.length < 8) {
    passwordState = false;
    return creatSpanEl(input, "비밀번호를 8자 이상 입력해주세요.");
  }
  input.classList.remove("focus-out");
  input.nextElementSibling?.remove();
  passwordState = true;
};

//비밀번호 확인 유효성 검사
const passwordMatchValidation = (input) => {
  if (input.value !== inputPassword.value) {
    passwordConfirmState = false;
    return creatSpanEl(input, "비밀번호가 일치하지 않습니다.");
  }
  input.classList.remove("focus-out");
  input.nextElementSibling?.remove();
  passwordConfirmState = true;
};

const btnHide = document.querySelectorAll(".btn-hide");

//비밀번호 표시 버튼
btnHide.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (
      btn.nextElementSibling.nextElementSibling.getAttribute("type") ===
      "password"
    ) {
      btn.children[0].setAttribute("src", "/images/btn_visibility_on_24px.png");
      btn.nextElementSibling.nextElementSibling.setAttribute("type", "text");
    } else {
      btn.children[0].setAttribute(
        "src",
        "/images/btn_visibility_off_24px.png"
      );
      btn.nextElementSibling.nextElementSibling.setAttribute(
        "type",
        "password"
      );
    }
  });
});

const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");
const submitbtn = document.querySelector(".register-btn");

const submitState = () => {
  let finalState = emailState && passwordState;

  if (registerForm) {
    finalState =
      emailState && passwordState && nickNameState && passwordConfirmState;
  }

  if (finalState) {
    submitbtn.classList.add("active-btn");
    submitbtn.disabled = false;
    submitbtn.style.cursor = "pointer";
  } else {
    submitbtn.classList.remove("active-btn");
    submitbtn.disabled = true;
    submitbtn.style.cursor = "default";
  }
};

submitbtn.addEventListener('click',(e) => {
  e.preventDefault();
  if(loginForm) {
    window.location.href = '/items'
  }
  if (registerForm) {
    window.location.href = '../login/login.html'
  }
})

export {
  inputEmail,
  inputNickName,
  inputPassword,
  inputPasswordConfirm,
  checkInput,
  emailValidation,
  nickNameValidation,
  passwordValidation,
  passwordMatchValidation,
};
