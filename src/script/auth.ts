const emailInput = document.querySelector("#email") as HTMLInputElement;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const pwdInput = document.querySelector("#password") as HTMLInputElement;
const errBox = document.querySelector("#error-msg") as HTMLElement;
const nameInput = document.querySelector("#name") as HTMLInputElement;
const pwdInputChk = document.querySelector("#chk-password") as HTMLInputElement;

// 이메일 & 비밀번호 제어
function validateInput(inputId: HTMLInputElement, errMsg: string): void {
  inputId.classList.add("input-error");
  const errorBox = inputId
    .closest("div")
    ?.querySelector("#error-msg") as HTMLElement;
  if (errorBox) {
    errorBox.textContent = errMsg;
  }
}

// 이메일 & 비밀번호 초기화
function validateInputremove(inputId: HTMLInputElement): void {
  inputId.classList.remove("input-error");
  const errorBox = inputId
    .closest("div")
    ?.querySelector("#error-msg") as HTMLElement;
  if (errorBox) {
    errorBox.textContent = "";
  }
}

// 이메일 조건부
function validateEmail(): void {
  if (emailInput.value === "") {
    validateInput(emailInput, "이메일을 입력해주세요.");
  } else if (!emailPattern.test(emailInput.value)) {
    validateInput(emailInput, "잘못된 이메일 형식입니다.");
  } else {
    validateInputremove(emailInput);
  }
}

// 비밀번호 조건부
function validatePwd(): void {
  if (pwdInput.value === "") {
    validateInput(pwdInput, "비밀번호를 입력해주세요.");
  } else if (pwdInput.value.length < 8) {
    validateInput(pwdInput, "비밀번호를 8자 이상 입력해주세요.");
  } else {
    validateInputremove(pwdInput);
  }
}

// 비밀번호 확인
function validatePwdChk() {
  if (pwdInput.value !== pwdInputChk.value) {
    validateInput(pwdInputChk, "비밀번호가 일치하지 않습니다.");
  } else {
    validateInputremove(pwdInputChk);
  }
}

// 닉네임 조건부
function validateName() {
  if (nameInput.value === "") {
    validateInput(nameInput, "닉네임을 입력해주세요.");
  } else {
    validateInputremove(nameInput);
  }
}

// 비밀번호 노출 제어
document.querySelectorAll(".pwd_icon").forEach((pwdIcon) => {
  pwdIcon.addEventListener("click", function (e: Event) {
    const target = e.currentTarget as HTMLElement;
    const pwdIconImg = target.querySelector("img") as HTMLImageElement;
    const pwdWrapper = target.closest(".pwd-wrapper") as HTMLElement;
    const passwordInput = pwdWrapper.querySelector(
      ".form_input"
    ) as HTMLInputElement;
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      pwdIconImg.src = "./images/icon/ic_pwd_default.png";
    } else {
      passwordInput.type = "password";
      pwdIconImg.src = "./images/icon/ic_pwd_variant.png";
    }
  });
});

// 버튼 비활성화
document.querySelector("form")?.addEventListener("submit", function (e: Event) {
  const form = e.currentTarget as HTMLFormElement;
  const inputBox = form.querySelectorAll(".form_input");
  inputBox.forEach((el) => {
    if (
      (el as HTMLInputElement).value === "" ||
      errBox.innerText !== "" ||
      pwdInput.value.length < 8
    ) {
      e.preventDefault();
    }
  });
});

// 이메일 & 비밀번호 & 비밀번호 확인 & 닉네임 호출
emailInput.addEventListener("focusout", validateEmail);
pwdInput.addEventListener("focusout", validatePwd);
pwdInputChk.addEventListener("focusout", validatePwdChk);
nameInput.addEventListener("focusout", validateName);
