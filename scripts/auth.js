let isEmailValid = false;
let isNicknameValid = false;
let isPasswordValid = false;
let isPasswordRepeatValid = false;

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const emailInput = document.getElementById("email");
const nickNameInput = document.getElementById("nickname");
const passwordInput = document.getElementById("password");
const passwordRepeatInput = document.getElementById("password-repeat");
const submitButton =
    document.getElementById("signup-button") ||
    document.getElementById("login-button");

// 에러 메세지 출력
const showErrorMessage = (input, errorId) => {
    const errorElement = document.getElementById(errorId);
    errorElement.style.display = "block";
    input.style.border = "2px solid var(--color-red-error)";
};

// 에러 메세지 숨김
const hideErrorMessage = (input, errorId) => {
    const errorElement = document.getElementById(errorId);
    errorElement.style.display = "none";
    input.style.border = "none";
};

// 이메일 유효성 검사
const checkEmail = (email) => {
    const regulerEmail = /^[A-Za-z0-9_\.-]+@[\dA-Za-z\.-]+\.[A-Za-z\.]{2,6}$/;
    return regulerEmail.test(email);
};

// 이메일 input 유효성 검사
const checkEmailValid = () => {
    const emailValid = emailInput.value;

    isEmailValid = false;
    hideErrorMessage(emailInput, "email-empty-error");
    hideErrorMessage(emailInput, "email-invalid-error");

    if (!emailValid) {
        showErrorMessage(emailInput, "email-empty-error");
    } else if (!checkEmail(emailValid)) {
        showErrorMessage(emailInput, "email-invalid-error");
    } else {
        isEmailValid = true;
        hideErrorMessage(emailInput, "email-empty-error");
        hideErrorMessage(emailInput, "email-invalid-error");
    }

    updateButtonState();
};

// 닉네임 input 유효성 검사
const checkNickNameValid = () => {
    const nicknameValid = nickNameInput.value;

    isNicknameValid = false;
    hideErrorMessage(nickNameInput, "nickname-empty-error");

    if (!nicknameValid) {
        showErrorMessage(nickNameInput, "nickname-empty-error");
    } else {
        isNicknameValid = true;
        hideErrorMessage(nickNameInput, "nickname-empty-error");
    }

    // 회원가입 페이지일 경우에만 실행
    if (signupForm) {
        updateButtonState();
    }
};

// 비밀번호 input 유효성 검사
const checkPassWordValid = () => {
    const passwordValid = passwordInput.value;

    isPasswordValid = false;
    hideErrorMessage(passwordInput, "pw-empty-error");
    hideErrorMessage(passwordInput, "pw-invalid-error");

    if (!passwordValid) {
        showErrorMessage(passwordInput, "pw-empty-error");
    } else if (passwordValid.length < 8) {
        showErrorMessage(passwordInput, "pw-invalid-error");
    } else {
        isPasswordValid = true;
        hideErrorMessage(passwordInput, "pw-empty-error");
        hideErrorMessage(passwordInput, "pw-invalid-error");
    }
    updateButtonState();
};

// 비밀번호-확인 input 유효성 검사
const checkPasswordRepeatValid = () => {
    const passwordRepeatValid = passwordRepeatInput.value;

    isPasswordRepeatValid = false;
    hideErrorMessage(passwordRepeatInput, "pw-repeat-invalid-error");

    if (passwordRepeatValid !== passwordInput.value) {
        showErrorMessage(passwordRepeatInput, "pw-repeat-invalid-error");
    } else {
        isPasswordRepeatValid = true;
        hideErrorMessage(passwordRepeatInput, "pw-repeat-invalid-error");
    }

    // 회원가입 페이지일 경우에만 실행
    if (signupForm) {
        updateButtonState();
    }
};

// 버튼 활성화 검사
const updateButtonState = () => {
    // 로그인 페이지: 이메일과 비밀번호가 유효한지 검사
    let isFormValid = isEmailValid && isPasswordValid;

    // 회원가입 페이지: 이메일, 비밀번호 + 닉네임 비밀번호-확인 까지 검사
    if (signupForm) {
        isFormValid = isFormValid && isNicknameValid && isPasswordRepeatValid;
    }
    console.log(isFormValid);

    submitButton.disabled = !isFormValid;
};

// 로그인 버튼 클릭 시 items 페이지로 이동
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // form 태그의 submit 동작 방지
        window.location.href = "items.html";
    });
}

// 회원가입 버튼 클릭 시 login 페이지로 이동
if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        window.location.href = "login.html";
    });
}

if (emailInput) {
    emailInput.addEventListener("input", checkEmailValid);
}
if (nickNameInput) {
    nickNameInput.addEventListener("input", checkNickNameValid);
}
if (passwordInput) {
    passwordInput.addEventListener("input", checkPassWordValid);
}
if (passwordRepeatInput) {
    passwordRepeatInput.addEventListener("input", checkPasswordRepeatValid);
}
