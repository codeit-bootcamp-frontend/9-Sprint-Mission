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
let password = "";

// 이메일 검증
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

// 닉네임 검증
const onFocusOutNickname = (e) => {
  let errorSpan = formItemBoxNickname.querySelector("span");
  let errorClass = formItemBoxNickname.classList.add("error");

  if (!errorSpan) {
    errorSpan = document.createElement("span");
    formItemBoxNickname.appendChild(errorSpan);
  }

  if (e.target.value.trim() === "") {
    errorSpan.style.display = "block";
    errorSpan.textContent = "닉네임을 입력해주세요.";
    errorClass;
    isNicknameValid = false;
  } else {
    errorSpan.style.display = "none";
    errorSpan.textContent = "";
    formItemBoxNickname.classList.remove("error");
    isNicknameValid = true;
  }
};

// 비밀번호1 검증
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
    password = e.target.value;
    errorSpan.style.display = "none";
    errorSpan.textContent = "";
    formItemBoxPassword.classList.remove("error");
    isPasswordValid = true;
  }

  toggleEnableBtn();
};

// 비밀번호2 검증
const onFocusOutPassword2 = (e) => {
  let errorSpan = formItemBoxPassword2.querySelector("span");
  let errorClass = formItemBoxPassword2.classList.add("error");

  if (!errorSpan) {
    errorSpan = document.createElement("span");
    formItemBoxPassword2.appendChild(errorSpan);
  }

  if (e.target.value.trim() === "") {
    errorSpan.style.display = "block";
    errorSpan.textContent = "비밀번호를 입력해주세요.";
    errorClass;
    isPassword2Valid = false;
  } else if (e.target.value.length < 8) {
    errorSpan.style.display = "block";
    errorSpan.textContent = "비밀번호를 8자 이상 입력해주세요.";
    errorClass;
    isPassword2Valid = false;
  } else if (e.target.value !== password) {
    errorSpan.style.display = "block";
    errorSpan.textContent = "비밀번호가 일치하지 않습니다.";
    errorClass;
    isPassword2Valid = false;
  } else {
    errorSpan.style.display = "none";
    errorSpan.textContent = "";
    password = "";
    formItemBoxPassword2.classList.remove("error");
    isPassword2Valid = true;
  }

  toggleEnableBtn();
};

// 회원가입버튼 활성화 함수
const toggleEnableBtn = () => {
  if (isEmailValid && isNicknameValid && isPasswordValid && isPassword2Valid) {
    submitBtn.removeAttribute("disabled");
    submitBtn.classList.remove("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
    submitBtn.classList.add("disabled");
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
  }

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

