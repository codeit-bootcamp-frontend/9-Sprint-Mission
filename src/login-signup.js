const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordCheckInput = document.getElementById("passwordcheck");
const usernameInput = document.getElementById("username");
const signupButton = document.getElementById("signupButton");
const loginButton = document.getElementById("loginButton");

//에러가 발생하면 보여주는 함수
function showError(input, errorId) {
  const errorElement = document.getElementById(errorId);
  errorElement.style.display = "block";
  input.style.border = "1px solid #f74747";
}
//조건에 맞으면 에러를 숨기는 함수
function hideError(input, errorId) {
  const errorElement = document.getElementById(errorId);
  errorElement.style.display = "none";
  input.style.border = "none";
}
//이메일형식에 맞는지 확인하는 로직
function validateEmailString(email) {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailRegex.test(email);
}
//이메일창 체크
function checkEmail() {
  const emailValue = emailInput.value.trim();

  hideError(emailInput, "emailError");
  hideError(emailInput, "notEmailFormError");

  if (!emailValue) {
    showError(emailInput, "emailError");
  } else if (!validateEmailString(emailValue)) {
    showError(emailInput, "notEmailFormError");
  } else {
    hideError(emailInput, "emailError");
    hideError(emailInput, "notEmailFormError");
  }
  updateSubmitButtonState()
}
//패스워드창 체크
function passwordCheck() {
  const passwordValue = passwordInput.value.trim();

  hideError(passwordInput, "passwordError")
  hideError(passwordInput, "passwordLengthError")

  if (!passwordValue) {
    showError(passwordInput, "passwordError")
  } else if (passwordValue.length < 8) {
    showError(passwordInput, "passwordLengthError")
  } else {
    hideError(passwordInput, "passwordError")
    hideError(passwordInput, "passwordLengthError")   
  }
   //아래 내용이 어떤 구조로 비밀번호 확인 필드를 먼저 입력할 때 검증이 되는것인지 궁금합니다. 제 생각엔 passwordDubbleCheck 함수를 한번 더 마지막에 불러옴으로써 두 값이 동일한지를 파악하는것 같은데... 맞는건가요?
  if (signupForm) {
    passwordDubbleCheck();
  }
  updateSubmitButtonState()
}

//패스워드 확인창 체크
function passwordDubbleCheck() {
  const passwordCheckValue = passwordCheckInput.value.trim();

  hideError(passwordCheckInput, "passwordSameError")

  if (passwordCheckValue !== passwordInput.value.trim()) {
    showError(passwordCheckInput, "passwordSameError")
  } else {
    hideError(passwordCheckInput, "passwordSameError")
  }
  updateSubmitButtonState()
}
//닉네임창 체크
function usernameCheck() {
  const usernameValue = usernameInput.value.trim();

  hideError(usernameInput, "usernameError")

  if (!usernameValue) {
    showError(usernameInput, "usernameError")
  } else {
    hideError(usernameInput, "usernameError")
  }
  updateSubmitButtonState()
}


// 하나의 js 파일이어서 각각 if문으로 필요한 변수값을 구분하여줌 ...이거 해결하는데 2시간 걸렸습니다...
function updateSubmitButtonState() {
  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const emailValid = validateEmailString(emailValue);
  const passwordValid = passwordValue.length >= 8;
if (signupForm) {
  const passwordCheckValue = passwordCheckInput.value.trim();
  const usernameValue = usernameInput.value.trim();
  const passwordsMatch = passwordValue === passwordCheckValue;
  const usernameValid = usernameValue !== "";

  signupButton.disabled = !(emailValid && passwordValid && passwordsMatch && usernameValid);
}
if (loginForm) {
  loginButton.disabled = !(emailValid && passwordValid );
}
}

//사이트 접속 시 회원가입 버튼 비활성화하기위해 & 조건에 맞으면 활성화하기위한 함수 호출
updateSubmitButtonState();

if (emailInput) {
  emailInput.addEventListener("focusout", checkEmail);
}
if (passwordInput) {
  passwordInput.addEventListener("input", passwordCheck);
}
if (usernameInput) {
  usernameInput.addEventListener("focusout", usernameCheck);
}
if (passwordCheckInput) {
  passwordCheckInput.addEventListener("input", passwordDubbleCheck)
}
//비밀번호 보이기
function passwordSeeToggle(e) {
  const button = e.currentTarget;
  const inputField = button.parentElement.querySelector("input");
  const toggleIcon = button.querySelector(".passwordSee");

  const isPasswordVisible = inputField.type === "password";

  inputField.type = isPasswordVisible ? "text" : "password";

  toggleIcon.src = isPasswordVisible
  ? "../icon/passwordIconSee.png"
  : "../icon/passwordIcon.png";
  toggleIcon.alt = isPasswordVisible
  ? "비밀번호 표시 상태 아이콘"
  : "비밀번호 숨김 상태 아이콘";
}
  const toggleButtons = document.querySelectorAll(".password-toggle-button"); // 'password-toggle-button' 클래스를 가진 모든 요소들의 배열
  toggleButtons.forEach((button) =>
    button.addEventListener("click", passwordSeeToggle)
  );