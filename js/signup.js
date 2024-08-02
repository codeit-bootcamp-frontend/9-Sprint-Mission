const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
const emailErrorbox = document.querySelector('.input-email')
const passwordErrorbox = document.querySelector('.input-password')
const errorSpan = document.createElement('span')

const loginbtn = document.querySelector('.form-btn')

const nicknameInput = document.querySelector('#nickname')
const passwordCheckInput = document.querySelector('#password-check')


function addErrorMessage(e) {
    if (e.target.value === "") {
        emailInput.classList.add('changeRed');
        errorSpan.textContent = "이메일을 입력해주세요."
        errorSpan.classList.add('error-msg')
        e.target.parentElement.appendChild(errorSpan)
        }
    else if (!e.target.value.includes("@")) {
        emailInput.classList.add('changeRed');
        errorSpan.textContent = "잘못된 이메일 형식입니다"
        errorSpan.classList.add('error-msg')
        e.target.parentElement.appendChild(errorSpan)
    }
    else {
        emailInput.classList.remove('changeRed');
        errorSpan.remove(errorSpan)
}}





function pwErrorMessage(e) {
    if (e.target.value === "") {
        passwordInput.classList.add('changeRed');
        errorSpan.textContent = "비밀번호를 입력해주세요."
        errorSpan.classList.add('error-msg')
        e.target.parentElement.appendChild(errorSpan)
        }
    else if (e.target.value.length < 8) {
        passwordInput.classList.add('changeRed');
        errorSpan.textContent = "비밀번호를 8자 이상 입력해주세요."
        errorSpan.classList.add('error-msg')
        e.target.parentElement.appendChild(errorSpan)
    }
    else {
        passwordInput.classList.remove('changeRed');
        errorSpan.remove(errorSpan)
}}


function nickNameErrorMessage(e) {
    if (e.target.value === "") {
        nicknameInput.classList.add('changeRed');
        errorSpan.textContent = "닉네임을 입력해주세요."
        errorSpan.classList.add('error-msg')
        e.target.parentElement.appendChild(errorSpan)
        }
}

function pwcheckErrorMessage(e) {
    if (e.target.value !== passwordInput.value) {
        passwordCheckInput.classList.add('changeRed');
        errorSpan.textContent = "비밀번호가 일치하지 않습니다."
        errorSpan.classList.add('error-msg')
        e.target.parentElement.appendChild(errorSpan)
    }
}







emailInput.addEventListener('focusout', addErrorMessage)
passwordInput.addEventListener('focusout', pwErrorMessage)
nicknameInput.addEventListener('focusout', nickNameErrorMessage)
passwordCheckInput.addEventListener('focusout', pwcheckErrorMessage)

