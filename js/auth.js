const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const passwordPattern = /^.{8,}$/;
const isEmailInput = document.querySelector("#email-input");
const isPasswordInput = document.querySelector("#password-input");
const isEmailEmptyError = document.querySelector("#email-empty-error");
const isEmailFormatError = document.querySelector("#email-format-error");
const isPasswordEmptyError = document.querySelector("#password-empty-error");
const isPasswordFormatError = document.querySelector("#password-format-error");
const isLoginButton = document.querySelector(".login-button");

//해당 input 값이 존재하는지 확인하는 함수
function validateDataExist(input) {
    if (input.value) return true;
    else return false;
}

//해당 input 값이 형식이 맞는지 확인하는 함수
function validateFormatRight(input) {
    if (input == isEmailInput) return emailPattern.test(input.value);
    else if (input == isPasswordInput) return passwordPattern.test(input.value);
}

//"이메일을 입력해 주세요." 또는 "비밀번호를 입력해 주세요." 에러메시지를 띄어주는 함수
function printEmptyErrorMessage(input) {

    //input의 종류가 Email인지 Password인지 탐색
    if (input == isEmailInput) {
        //"이메일 형식이 아닙니다." 에러메시지가 있을 경우 삭제하기
        if (isEmailFormatError.style.display == 'block') isEmailFormatError.style.display = 'none';
        let isEmptyError = document.querySelector("#email-empty-error");
        isEmptyError.style.display = "block";
    }
    else if (input == isPasswordInput) {
        //"비밀번호를 8자 이상 입력해 주세요." 에러메시지가 있을 경우 삭제하기
        if (isPasswordFormatError.style.display == 'block') isPasswordFormatError.style.display = 'none';
        let isEmptyError = document.querySelector("#password-empty-error");
        isEmptyError.style.display = "block";
    }
}

//"이메일 형식이 아닙니다" OR "비밀번호를 8자 이상 입력해 주세요." 에러메시지를 띄어주는 함수
function printFormatErrorMessage(input) {
    //input의 종류가 Email인지 Password인지 탐색
    if (input == isEmailInput) {
        //"이메일을 입력해주세요." 에러메세지가 있을 경우 삭제하기.
        if (isEmailEmptyError.style.display == 'block') isEmailEmptyError.style.display = 'none';
        let isFormatError = document.querySelector("#email-format-error");
        isFormatError.style.display = "block";
    }
    else if (input == isPasswordInput) {
        //"비밀번호를 입력해주세요." 에러메세지가 있을 경우 삭제하기.
        if (isPasswordEmptyError.style.display == 'block') isPasswordEmptyError.style.display = 'none';
        let isFormatError = document.querySelector("#password-format-error");
        isFormatError.style.display = "block";
    }
}

//로그인 정보가 모두 맞을 시 보여지는 에러메시지를 모두 삭제해주는 함수
function deleteErrorMessage() {
    if (isEmailEmptyError.style.display == 'block') isEmailEmptyError.style.display = 'none';
    if (isEmailFormatError.style.display == 'block') isEmailFormatError.style.display = 'none';
    if (isPasswordEmptyError.style.display == 'block') isPasswordEmptyError.style.display = 'none';
    if (isPasswordFormatError.style.display == 'block') isPasswordFormatError.style.display = 'none';
}

function onLoginButton() {
    isLoginButton.classList.add('active');
}

function offLoginButton() {
    isLoginButton.classList.remove('active');
}

function inputErrorHandler(targetDOM) {
    return function () {
        let isDataExist = validateDataExist(targetDOM);
        let isFormatRight = validateFormatRight(targetDOM);
        let isLoginActivated = isLoginButton.classList.contains('active');

        if (isDataExist && isFormatRight) {
            deleteErrorMessage();
            targetDOM.classList.add('complete');
        }
        else if (!isDataExist) {
            if (isLoginActivated) offLoginButton();
            printEmptyErrorMessage(targetDOM);
        }
        else if (isDataExist && !isFormatRight) {
            if (isLoginActivated) offLoginButton();
            printFormatErrorMessage(targetDOM);
        }
    }
}


isEmailInput.addEventListener('blur', inputErrorHandler(isEmailInput));
isEmailInput.addEventListener('input', inputErrorHandler(isEmailInput));
isPasswordInput.addEventListener('blur', inputErrorHandler(isPasswordInput));
isPasswordInput.addEventListener('input', inputErrorHandler(isPasswordInput));
