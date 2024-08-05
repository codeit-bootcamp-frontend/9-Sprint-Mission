const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const usernameInput = document.querySelector("#username");
const passwordCheckInput = document.querySelector("#password-check");
const loginButton = document.querySelector(".login-button");
const passwordHide = document.querySelectorAll(".password-hide");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//포커스아웃되면  email 에러메세지 발생하는 함수
function emailInputError(e) {
  if (e.target.value === "") {
    e.target.classList.add("red-box");
    const emailErrMessege = document.createElement("span");
    emailErrMessege.textContent = "이메일을 입력해주세요";
    emailErrMessege.classList.add("err-messege");
    emailInput.after(emailErrMessege);
    return;
  }

  if (!emailRegex.test(e.target.value)) {
    e.target.classList.add("red-box");
    const emailErrMessege = document.createElement("span");
    emailErrMessege.textContent = "잘못된 이메일 형식입니다";
    emailErrMessege.classList.add("err-messege");
    emailInput.after(emailErrMessege);
    return;
  }

  e.target.classList.remove("red-box");
}

//포커스인되면 email 에러메세지 제거하는 함수
function emailInputErrorRemove(e) {
  const removeTarget = e.target.nextElementSibling;
  if (
    removeTarget.tagName === "SPAN" &&
    removeTarget.classList.contains("err-messege")
  ) {
    removeTarget.remove();
  }
}

//포커스아웃되면 password 에러메세지 발생하는 함수
function passwordInputError(e) {
  if (e.target.value === "") {
    e.target.classList.add("red-box");
    const passwordErrMessege = document.createElement("span");
    passwordErrMessege.textContent = "비밀번호을 입력해주세요";
    passwordErrMessege.classList.add("err-messege");
    passwordInput.parentElement.after(passwordErrMessege);
    return;
  }

  if (e.target.value.length < 8) {
    e.target.classList.add("red-box");
    const passwordErrMessege = document.createElement("span");
    passwordErrMessege.textContent = "비밀번호를 8자 이상 입력해주세요";
    passwordErrMessege.classList.add("err-messege");
    passwordInput.parentElement.after(passwordErrMessege);
    return;
  }

  e.target.classList.remove("red-box");
}

//포커스인되면 password 에러메세지 제거하는 함수
function passwordInputErrorRemove(e) {
  const removeTarget = e.target.parentElement.nextElementSibling;
  if (
    removeTarget.tagName === "SPAN" &&
    removeTarget.classList.contains("err-messege")
  ) {
    removeTarget.remove();
  }
}

//포커스아웃되면 username 에러메세지 발생하는 함수
function usernameInputError(e) {
  if (e.target.value === "") {
    e.target.classList.add("red-box");
    const usernameErrMessege = document.createElement("span");
    usernameErrMessege.textContent = "닉네임을 입력해주세요";
    usernameErrMessege.classList.add("err-messege");
    usernameInput.after(usernameErrMessege);
    return;
  }

  e.target.classList.remove("red-box");
}

//포커스인되면 username 에러메세지 제거하는 함수
function usernameInputErrorRemove(e) {
  const removeTarget = e.target.nextElementSibling;
  if (
    removeTarget.tagName === "SPAN" &&
    removeTarget.classList.contains("err-messege")
  ) {
    removeTarget.remove();
  }
}

//포커스아웃되면 passwordCheck 에러메세지 발생하는 함수
function passwordCheckInputError(e) {
  if (e.target.value !== passwordInput.value) {
    e.target.classList.add("red-box");
    const passwordCheckErrMessege = document.createElement("span");
    passwordCheckErrMessege.textContent = "비밀번호가 일치하지 않습니다";
    passwordCheckErrMessege.classList.add("err-messege");
    passwordCheckInput.parentElement.after(passwordCheckErrMessege);
    return;
  }

  e.target.classList.remove("red-box");
}

//포커스인되면 passwordCheck 에러메세지 제거하는 함수
function passwordCheckInputErrorRemove(e) {
  const removeTarget = e.target.parentElement.nextElementSibling;
  if (
    removeTarget.tagName === "SPAN" &&
    removeTarget.classList.contains("err-messege")
  ) {
    removeTarget.remove();
  }
}

//이벤트 핸들링 모음 (로그인 버튼, 눈가리기 제외)
emailInput.addEventListener("focusout", emailInputError);
emailInput.addEventListener("focusin", emailInputErrorRemove);
passwordInput.addEventListener("focusout", passwordInputError);
passwordInput.addEventListener("focusin", passwordInputErrorRemove);

if (usernameInput) {
  usernameInput.addEventListener("focusout", usernameInputError);
  usernameInput.addEventListener("focusin", usernameInputErrorRemove);
}
if (passwordCheckInput) {
  passwordCheckInput.addEventListener("focusout", passwordCheckInputError);
  passwordCheckInput.addEventListener("focusin", passwordCheckInputErrorRemove);
}

//인풋체크함수
function inputCheck() {
  if (emailInput.value === "") {
    e.preventDefault();
    return;
  }

  if (!emailRegex.test(emailInput.value)) {
    e.preventDefault();
    return;
  }

  if (usernameInput && usernameInput.value === "") {
    e.preventDefault();
    return;
  }

  if (passwordInput.value === "") {
    e.preventDefault();
    return;
  }

  if (passwordInput.value.length < 8) {
    e.preventDefault();
    return;
  }

  if (passwordCheckInput && passwordInput.value !== passwordCheckInput.value) {
    e.preventDefault();
    return;
  }
}

//로그인, 회원가입 버튼 활성화 조건 함수
loginButton.addEventListener("click", function (e) {
  e.preventDefault();
  inputCheck();
  if (e.target.textContent === "로그인") {
    document.location.href = "./items.html";
    return;
  }

  if (e.target.textContent === "회원가입") {
    document.location.href = "./signin.html";
    return;
  }
});

//인풋값 정상일 때, 로그인&회원가입 css 추가
loginButton.addEventListener("mouseover", function (e) {
  inputCheck();
  e.target.classList.add("login-button-hover");
});

//마우스아웃 시, 로그인&회원가입 css 제거
loginButton.addEventListener("mouseout", function (e) {
  e.target.classList.remove("login-button-hover");
});

//비밀번호 눈가리기 함수
passwordHide.forEach(function (hide) {
  hide.addEventListener("click", function (e) {
    if (e.target.previousElementSibling.type === "password") {
      e.target.previousElementSibling.type = "";
      e.target.classList.add("no-hide");
      return;
    }

    if (e.target.previousElementSibling.type !== "password") {
      e.target.previousElementSibling.type = "password";
      e.target.classList.remove("no-hide");
      return;
    }
  });
});
