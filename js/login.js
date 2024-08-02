const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
const emailErrorbox = document.querySelector('.input-email')
const passwordErrorbox = document.querySelector('.input-password')
const errorSpan = document.createElement('span')
const pwErrorSpan = document.createElement('span')
const loginbtn = document.querySelector('.form-btn')

const emailChecker = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

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

// 버튼
function activeLoginBtn(e) {
    if (emailInput.classList.contains('changeRed') || passwordInput.classList.contains('changeRed')) {
        e.preventDefault();
    } else {
        window.location.href = "./items.html"
    }
}



emailInput.addEventListener('focusout', addErrorMessage)
passwordInput.addEventListener('focusout', pwErrorMessage)
loginbtn.addEventListener('submitm', activeLoginBtn)