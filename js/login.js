const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const passwordPattern = /^.{8,}$/;

const isEmailInput = document.querySelector("#email-input");
const isPasswordInput = document.querySelector("#password-input");
const isEmailEmptyError = document.querySelector("#email-empty-error");
const isEmailFormatError = document.querySelector("#email-format-error");
const isPasswordEmptyError = document.querySelector("#password-empty-error");
const isPasswordFormatError = document.querySelector("#password-format-error");
const isLoginButton = document.querySelector(".login-button");
const isPasswordVisibleButton = document.querySelector("#show-password");

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

//input 값이 잘 입력되었다면 'complete'클래스를 추가하고, email과 password 입력값이 "모두" 잘 들어왔을 경우 로그인창을 활성화하는 함수 
function onLoginButton(dom) {
    dom.classList.add('complete');
    if (isEmailInput.classList.contains('complete') && isPasswordInput.classList.contains('complete')) isLoginButton.classList.add('active');
}

//input 값이 이상할 경우 'complete'클래스를 삭제하고, email과 password 입력값이 "하나라도" 잘못된 경우 로그인창을 비활성화하는ㄴ 함수 
function offLoginButton(dom) {
    dom.classList.remove('complete');
    if (!(isEmailInput.classList.contains('complete') && isPasswordInput.classList.contains('complete'))) isLoginButton.classList.remove('active');
}

//password의 타입이 password이면 text로 바꾸고 text라면 password로 바꿔주는 함수
function togglePasswordVisible() {
    if (isPasswordInput.getAttribute('type') == 'password') isPasswordInput.setAttribute('type', 'text');
    else if (isPasswordInput.getAttribute('type') == 'text') isPasswordInput.setAttribute('type', 'password');
}

function inputErrorHandler(targetDOM) {
    return function () {
        let isDataExist = validateDataExist(targetDOM);
        let isFormatRight = validateFormatRight(targetDOM);

        if (isDataExist && isFormatRight) {
            targetDOM.classList.add('complete');
            deleteErrorMessage();
            onLoginButton(targetDOM);
        }
        else if (!isDataExist) {
            targetDOM.classList.remove('complete');
            printEmptyErrorMessage(targetDOM);
            offLoginButton(targetDOM);
        }
        else if (isDataExist && !isFormatRight) {
            targetDOM.classList.remove('complete');
            printFormatErrorMessage(targetDOM);
            offLoginButton(targetDOM);
        }
    }
}


isEmailInput.addEventListener('blur', inputErrorHandler(isEmailInput));
isEmailInput.addEventListener('input', inputErrorHandler(isEmailInput));
isPasswordInput.addEventListener('blur', inputErrorHandler(isPasswordInput));
isPasswordInput.addEventListener('input', inputErrorHandler(isPasswordInput));
isPasswordVisibleButton.addEventListener('click', togglePasswordVisible);