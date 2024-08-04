import { validClearInput, showError } from "./utils.js";

const emailInput = document.getElementById("user-email");
const nicknameInput = document.getElementById("user-nickname");
const passwordInput = document.getElementById("user-password");
const password2Input = document.getElementById("user-password2");
const formItemBoxEmail = document.querySelector(".form-item-box.email");
const formItemBoxNickname = document.querySelector(".form-item-box.nickname");
const formItemBoxPassword = document.querySelector(".form-item-box.password");
const formItemBoxPassword2 = document.querySelector(".form-item-box.password2");
const submitBtn = document.querySelector(".submitBtn");
const visiblePasswordImg = document.querySelectorAll(".visiblePassword");

// 입력요소 검증 시 사용할 불린값
let isEmailValid = false;
let isNicknameValid = false;
let isPasswordValid = false;
let isPassword2Valid = false;

// 비밀번호 같은지 검증할 때 사용할 변수
let checkPassword = "";

// 이메일 검증
const onFocusOutEmail = (e) => {
  const email = e.target.value.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

  // 에러시에 span 태그 표출 및 감싸고 있는 div박스에 error 클래스 추가하여 에러스타일 적용
  if (email === "") {
    showError(formItemBoxEmail, "이메일을 입력해주세요.");
    isEmailValid = false;
  } else if (!emailRegex.test(email)) {
    showError(formItemBoxEmail, "잘못된 이메일 형식입니다.");
    isEmailValid = false;
  } else {
    validClearInput(formItemBoxEmail);
    isEmailValid = true;
  }

  toggleEnableBtn();
};

// 닉네임 검증
const onFocusOutNickname = (e) => {
  const nickname = e.target.value.trim();

  if (nickname === "") {
    showError(formItemBoxNickname, "닉네임을 입력해주세요.");
    isNicknameValid = false;
  } else {
    validClearInput(formItemBoxNickname);
    isNicknameValid = true;
  }

  toggleEnableBtn();
};

// 비밀번호1 검증
const onFocusOutPassword = (e) => {
  const password = e.target.value.trim();

  if (password === "") {
    showError(formItemBoxPassword, "비밀번호를 입력해주세요.");
    isPasswordValid = false;
  } else if (password.length < 8) {
    showError(formItemBoxPassword, "비밀번호를 8자 이상 입력해주세요.")
    isPasswordValid = false;
  } else {
    checkPassword = password;
    validClearInput(formItemBoxPassword);
    isPasswordValid = true;
  }
};

// 비밀번호2 검증
const onFocusOutPassword2 = (e) => {
  const password2 = e.target.value.trim();

  if (password2 === "") {
    showError(formItemBoxPassword2, "비밀번호를 입력해주세요.")
    isPassword2Valid = false;
  } else if (password2.length < 8) {
    showError(formItemBoxPassword2, "비밀번호를 8자 이상 입력해주세요.");
    isPassword2Valid = false;
  } else if (password2 !== checkPassword) {
    showError(formItemBoxPassword2, "비밀번호가 일치하지 않습니다.");
    isPassword2Valid = false;
  } else {
    validClearInput(formItemBoxPassword2);
    checkPassword = "";
    isPassword2Valid = true;
  }

  toggleEnableBtn();
};

// 회원가입버튼 활성화 함수
const toggleEnableBtn = () => {
  if (isEmailValid && isNicknameValid && isPasswordValid && isPassword2Valid) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
};

// 회원가입 함수
const onSignUp = (e) => {
  e.preventDefault();

  window.location.href = "/login.html";
};

// 비밀번호 문자열 보이기
visiblePasswordImg.forEach((img) => {
  const passwordInput = img.previousElementSibling;

  const onVisiblePassword = () => {
    img.classList.toggle("visible");
    changeVisibleFunc(passwordInput, img);
  };

  img.addEventListener("click", onVisiblePassword);
});

const changeVisibleFunc = (passwordInput, img) => {
  if (img.classList.contains("visible")) {
    passwordInput.setAttribute("type", "text");
    img.setAttribute("src", "/icons/btn_visibility_off.png");
  } else {
    passwordInput.setAttribute("type", "password");
    img.setAttribute("src", "/icons/btn_visibility_on.png");
  }
};

emailInput.addEventListener("focusout", onFocusOutEmail);
nicknameInput.addEventListener("focusout", onFocusOutNickname);
passwordInput.addEventListener("focusout", onFocusOutPassword);
password2Input.addEventListener("focusout", onFocusOutPassword2);
submitBtn.addEventListener("click", onSignUp);
