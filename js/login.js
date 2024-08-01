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
  let errorSpan = formItemBoxEmail.querySelector("span");
  let errorClass = formItemBoxEmail.classList.add("error");

  if (!errorSpan) {
    errorSpan = document.createElement("span");
    formItemBoxEmail.appendChild(errorSpan);
  }

  if (e.target.value.trim() === "") {
    errorSpan.style.display = "block";
    errorSpan.textContent = "이메일을 입력해주세요.";
    errorClass;
    isEmailValid = false;
  } else if (!e.target.value.includes("@")) {
    errorSpan.style.display = "block";
    errorSpan.textContent = "잘못된 이메일 형식입니다.";
    errorClass;
    isEmailValid = false;
  } else {
    errorSpan.style.display = "none";
    errorSpan.textContent = "";
    formItemBoxEmail.classList.remove("error");
    isEmailValid = true;
  }

  toggleEnableBtn();
};

// 비밀번호 focusOut 발생 시 실행함수
const onFocusOutPassword = (e) => {
  let errorSpan = formItemBoxPassword.querySelector("span");
  let errorClass = formItemBoxPassword.classList.add("error");

  if (!errorSpan) {
    errorSpan = document.createElement("span");
    formItemBoxPassword.appendChild(errorSpan);
  }

  if (e.target.value.trim() === "") {
    errorSpan.style.display = "block";
    errorSpan.textContent = "비밀번호를 입력해주세요.";
    errorClass;
    isPasswordValid = false;
  } else if (e.target.value.length < 8) {
    errorSpan.style.display = "block";
    errorSpan.textContent = "비밀번호를 8자 이상 입력해주세요.";
    errorClass;
    isPasswordValid = false;
  } else {
    errorSpan.style.display = "none";
    errorSpan.textContent = "";
    formItemBoxPassword.classList.remove("error");
    isPasswordValid = true;
  }

  toggleEnableBtn();
};

// 로그인버튼 활성화 함수
const toggleEnableBtn = () => {
  if (isEmailValid && isPasswordValid) {
    submitBtn.removeAttribute("disabled");
    submitBtn.classList.remove("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
    submitBtn.classList.add("disabled");
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
