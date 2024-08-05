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
// 에러 발생 시 textContent가 변경 되도록 수정
const showErrorMessage = (input, errorId, message) => {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    input.style.border = "2px solid var(--color-red-error)";
};

// 에러 메세지 숨김
// 에러 발생 시 textContent에 null값이 들어가도록 수정
const hideErrorMessage = (input, errorId) => {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = null;
    input.style.border = "none";
};

// 이메일 유효성 검사
const checkEmail = (email) => {
    const regulerEmail = /^[A-Za-z0-9_\.-]+@[\dA-Za-z\.-]+\.[A-Za-z\.]{2,6}$/;
    return regulerEmail.test(email);
};

// 이메일 input 유효성 검사
const isEmailEmpty = () => {
    const emailValid = emailInput.value;

    isEmailValid = false;
    hideErrorMessage(emailInput, "email-error");

    if (!emailValid) {
        showErrorMessage(emailInput, "email-error", "이메일을 입력해주세요");
    } else if (!checkEmail(emailValid)) {
        showErrorMessage(emailInput, "email-error", "잘못된 이메일 입니다");
    } else {
        isEmailValid = true;
        hideErrorMessage(emailInput, "email-error");
    }

    updateButtonState();
};

// 닉네임 input 유효성 검사
const isNicknameEmpty = () => {
    const nicknameValid = nickNameInput.value;

    isNicknameValid = false;
    hideErrorMessage(nickNameInput, "nickname-error");

    if (!nicknameValid) {
        showErrorMessage(
            nickNameInput,
            "nickname-error",
            "닉네임을 입력해주세요"
        );
    } else {
        isNicknameValid = true;
        hideErrorMessage(nickNameInput, "nickname-error");
    }

    // 회원가입 페이지일 경우에만 실행
    if (signupForm) {
        updateButtonState();
    }
};

// 비밀번호 input 유효성 검사
const isPasswordEmpty = () => {
    const passwordValid = passwordInput.value;

    isPasswordValid = false;

    hideErrorMessage(passwordInput, "pw-error");

    if (!passwordValid) {
        showErrorMessage(passwordInput, "pw-error", "비밀번호를 입력해주세요");
    } else if (passwordValid.length < 8) {
        showErrorMessage(
            passwordInput,
            "pw-error",
            "비밀번호를 8자 이상 입력해주세요"
        );
    } else {
        isPasswordValid = true;
        hideErrorMessage(passwordInput, "pw-error");
    }
    updateButtonState();
};

// 비밀번호-확인 input 유효성 검사
const isPasswordRepeatEmpty = () => {
    const passwordRepeatValid = passwordRepeatInput.value;

    isPasswordRepeatValid = false;
    hideErrorMessage(passwordRepeatInput, "pw-repeat-error");

    if (passwordRepeatValid !== passwordInput.value) {
        showErrorMessage(
            passwordRepeatInput,
            "pw-repeat-error",
            "비밀번호가 일치하지 않습니다"
        );
    } else {
        isPasswordRepeatValid = true;
        hideErrorMessage(passwordRepeatInput, "pw-repeat-error");
    }

    // 회원가입 페이지일 경우에만 실행
    if (signupForm) {
        updateButtonState();
    }
};

// form 유효성 검사와 버튼 활성화 검사 함수 분리
const isFormValid = () => {
    if (signupForm) {
        // 회원가입 페이지: 이메일, 비밀번호 + 닉네임 비밀번호-확인 까지 검사
        return (
            isEmailValid &&
            isPasswordValid &&
            isNicknameValid &&
            isPasswordRepeatValid
        );
    } else {
        // 로그인 페이지: 이메일과 비밀번호가 유효한지 검사
        return isEmailValid && isPasswordValid;
    }
};

// 버튼 활성화 검사
const updateButtonState = () => {
    submitButton.disabled = !isFormValid();
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

// focusout 될때 뿐만이 아니라 입력 받는 중간에도 유효성 검사를 하도록 변경
if (emailInput) {
    emailInput.addEventListener("input", isEmailEmpty);
    emailInput.addEventListener("focusout", isEmailEmpty);
}
if (nickNameInput) {
    nickNameInput.addEventListener("input", isNicknameEmpty);
    nickNameInput.addEventListener("focusout", isNicknameEmpty);
}
if (passwordInput) {
    passwordInput.addEventListener("input", isPasswordEmpty);
    passwordInput.addEventListener("focusout", isPasswordEmpty);
}
if (passwordRepeatInput) {
    passwordRepeatInput.addEventListener("input", isPasswordRepeatEmpty);
    passwordRepeatInput.addEventListener("focusout", isPasswordRepeatEmpty);
}

const viewPassWord = (e) => {
    const button = e.currentTarget;
    const input = button.parentElement.querySelector("input");
    const buttonImg = button.querySelector("img");

    input.type = input.type === "password" ? "text" : "password";
    buttonImg.src =
        input.type === "password"
            ? "./src/icon/Variant.png"
            : "./src/icon/Default.png";
};

// querySelectorAll 대신 getElementsByClassName를 쓰면 에러가 발생하는 이유가 궁금합니다.
const viewPassWordButtons = document.querySelectorAll(".pwd-Eye");
viewPassWordButtons.forEach((button) => {
    button.addEventListener("click", viewPassWord);
});
console.log(viewPassWordButtons);
