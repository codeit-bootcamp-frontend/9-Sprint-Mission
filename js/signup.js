const emailInput = document.querySelector('#email')
const emailErrorbox = document.querySelector('.input-email')
const passwordInput = document.querySelector('#password')
const passwordErrorbox = document.querySelector('.input-password')
const errorSpan = document.createElement('span')
const pwErrorSpan = document.createElement('span')
const nickNameErrorSpan = document.createElement('span')
const pwcheckErrorSpan = document.createElement('span')
const ErrorSpan = document.createElement('span')
const loginbtn = document.querySelector('.form-btn')
const nicknameInput = document.querySelector('#nickname')
const passwordCheckInput = document.querySelector('#password-check')

// 에러메시지
function showErrorStatus(input, span, msg) {
    input.classList.add('changeRed');
    span.textContent = msg
    span.classList.add('error-msg')
}

// 이메일
function addErrorMessage(e) {
    if (e.target.value === "") {
        showErrorStatus(emailInput, errorSpan, "이메일을 입력해주세요.");
        e.target.parentElement.appendChild(errorSpan)
    } else if (!e.target.value.includes("@")) {
        showErrorStatus(emailInput, errorSpan, "잘못된 이메일 형식입니다")
        e.target.parentElement.appendChild(errorSpan)
    } else {
        emailInput.classList.remove('changeRed');
        errorSpan.remove(errorSpan)
    }
}

// 패스워드
function pwErrorMessage(e) {
    if (e.target.value === "") {
        showErrorStatus(passwordInput, pwErrorSpan, "비밀번호를 입력해주세요.")
        e.target.parentElement.appendChild(pwErrorSpan)
    } else if (e.target.value.length < 8) {
        showErrorStatus(passwordInput, pwErrorSpan, "비밀번호를 8자 이상 입력해주세요.")
        e.target.parentElement.appendChild(pwErrorSpan)
    } else {
        passwordInput.classList.remove('changeRed');
        pwErrorSpan.remove(pwErrorSpan)
    }
}

// 닉네임
function nickNameErrorMessage(e) {
    if (e.target.value === "") {
        showErrorStatus(nicknameInput, nickNameErrorSpan, "닉네임을 입력해주세요.")
        e.target.parentElement.appendChild(nickNameErrorSpan)
    }
}

// 패스워드확인
function pwcheckErrorMessage(e) {
    if (e.target.value !== passwordInput.value) {
        showErrorStatus(passwordCheckInput, pwcheckErrorSpan, "비밀번호가 일치하지 않습니다.")
        e.target.parentElement.appendChild(pwcheckErrorSpan)
    }
}







emailInput.addEventListener('focusout', addErrorMessage)
passwordInput.addEventListener('focusout', pwErrorMessage)
nicknameInput.addEventListener('focusout', nickNameErrorMessage)
passwordCheckInput.addEventListener('focusout', pwcheckErrorMessage)