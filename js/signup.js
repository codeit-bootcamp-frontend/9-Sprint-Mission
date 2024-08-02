const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
const emailErrorbox = document.querySelector('.input-email')
const passwordErrorbox = document.querySelector('.input-password')
const errorSpan = document.createElement('span')

const loginbtn = document.querySelector('.form-btn')

const nicknameInput = document.querySelector('#nickname')
const passwordCheckInput = document.querySelector('#password-check')



// 에러메시지
function showErrorStatus(input, msg) {
    input.classList.add('changeRed');
    errorSpan.textContent = msg
    errorSpan.classList.add('error-msg')
}

// 이메일
function addErrorMessage(e) {
    if (e.target.value === "") {
        showErrorStatus(emailInput,"이메일을 입력해주세요.");
        e.target.parentElement.appendChild(errorSpan)
        }
    else if (!e.target.value.includes("@")) {   
        showErrorStatus(emailInput,"잘못된 이메일 형식입니다")
        e.target.parentElement.appendChild(errorSpan)
    }
    else {
        emailInput.classList.remove('changeRed');
        errorSpan.remove(errorSpan)
    }
}

function pwErrorMessage(e) {
    if (e.target.value === "") {
        showErrorStatus(passwordInput, "비밀번호를 입력해주세요")
        e.target.parentElement.appendChild(errorSpan)
        }
    else if (e.target.value.length < 8) {
        showErrorStatus(passwordInput, "비밀번호를 8자 이상 입력해주세요.")
        e.target.parentElement.appendChild(errorSpan)
    }
    else {
        passwordInput.classList.remove('changeRed');
        errorSpan.remove(errorSpan)
}}


function nickNameErrorMessage(e) {
    if (e.target.value === "") {
        showErrorStatus(nicknameInput, "닉네임을 입력해주세요.")
        e.target.parentElement.appendChild(errorSpan)
        }
}

function pwcheckErrorMessage(e) {
    if (e.target.value !== passwordInput.value) {
        showErrorStatus(passwordCheckInput, "비밀번호가 일치하지 않습니다.")
        e.target.parentElement.appendChild(errorSpan)
    }
}







emailInput.addEventListener('focusout', addErrorMessage)
passwordInput.addEventListener('focusout', pwErrorMessage)
nicknameInput.addEventListener('focusout', nickNameErrorMessage)
passwordCheckInput.addEventListener('focusout', pwcheckErrorMessage)

