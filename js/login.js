import { validClearInput, showError } from "./utils.js";

const emailInput = document.getElementById("user-email");
const passwordInput = document.getElementById("user-password");
const formItemBoxEmail = document.querySelector(".form-item-box.email");
const formItemBoxPassword = document.querySelector(".form-item-box.password");
const submitBtn = document.querySelector(".submitBtn");
const visiblePasswordImg = document.querySelector(".visiblePassword");

// 입력요소 검증 시 사용할 불린값
let isEmailValid = false;
let isPasswordValid = false;

// 이메일 focusOut 발생 시 실행함수
const onFocusOutEmail = (e) => {
  const email = e.target.value.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

  // 에러시에 span 태그 표출 및 감싸고 있는 div박스에 error 클래스 추가하여 에러스타일 적용 
  if (email === "") {
    showError(formItemBoxEmail, "이메일을 입력해주세요.");
    isEmailValid = false;
  } else if (!emailRegex.test(email)) {
    showError(formItemBoxEmail, "잘못된 이메일 형식입니다.")
    isEmailValid = false;
  } else {
    validClearInput(formItemBoxEmail);
    isEmailValid = true;
  }

  toggleEnableBtn();
};

// 비밀번호 focusOut 발생 시 실행함수
const onFocusOutPassword = (e) => {
  const password = e.target.value.trim();

  if (password === "") {
    showError(formItemBoxPassword, "비밀번호를 입력해주세요.");
    isPasswordValid = false;
  } else if (password.length < 8) {
    showError(formItemBoxPassword, "비밀번호를 8자 이상 입력해주세요.");
    isPasswordValid = false;
  } else {
    validClearInput(formItemBoxPassword);
    isPasswordValid = true;
  }

  toggleEnableBtn();
};

// 로그인버튼 활성화 함수
const toggleEnableBtn = () => {
  if (isEmailValid && isPasswordValid) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
};

// 로그인 함수
const onLogin = (e) => {
  e.preventDefault();

  window.location.href = "/items.html";
};

// 비밀번호 문자열 보이기
const onVisiblePassword = () => {
  visiblePasswordImg.classList.toggle("visible");
  changeVisibleFunc();
};

const changeVisibleFunc = () => {
  if (visiblePasswordImg.classList.contains("visible")) {
    passwordInput.setAttribute("type", "text");
    visiblePasswordImg.setAttribute("src", "/icons/btn_visibility_off.png");
  } else {
    passwordInput.setAttribute("type", "password");
    visiblePasswordImg.setAttribute("src", "/icons/btn_visibility_on.png");
  }
};

emailInput.addEventListener("focusout", onFocusOutEmail);
passwordInput.addEventListener("focusout", onFocusOutPassword);
submitBtn.addEventListener("click", onLogin);
visiblePasswordImg.addEventListener("click", onVisiblePassword);
