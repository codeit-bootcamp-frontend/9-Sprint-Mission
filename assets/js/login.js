//input 에러처리 정규표현식 
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^.{8,}$/;

const domEmailInput = document.querySelector('#email-input');
const domEmailWrap = document.querySelector('#email-wrap');
const domPasswordInput = document.querySelector('#password-input');
const domPasswordWrap = document.querySelector('#password-wrap');
const domLoginButton = document.querySelector('.login-button');

function emailErrorHandler() {
    const existingEmptyError = document.querySelector('.email-empty-error');
    const existingFormatError = document.querySelector('.email-format-error');

    if (!domEmailInput.value) {
        if (existingEmptyError) return; //focus가 다시 되었을 때 div를 또 생성하는 예외처리
        if (existingFormatError) existingFormatError.remove(); //형식 에러처리를 한 상황에서 빈값 에러 메시지가 하나 더 생기는 예외처리
        if (domEmailWrap.classList.remove('complete'));

        const el = document.createElement('div');
        domEmailInput.style.border = '1px solid #F74747';
        el.classList.add('email-empty-error');
        el.innerHTML = '이메일을 입력해 주세요.';
        domEmailWrap.appendChild(el);
    }

    if (domEmailInput.value && !emailPattern.test(domEmailInput.value)) {
        if (existingFormatError) return; //focus가 다시 되었을 때 div를 또 생성하는 예외처리
        if (existingEmptyError) existingEmptyError.remove(); //빈값 에러처리를 한 상황에서 형식 에러 메시지가 하나 더 생기는 예외처리
        const el = document.createElement('div');
        domEmailInput.style.border = '1px solid #F74747';
        el.classList.add('email-format-error');
        el.innerHTML = '잘못된 이메일 형식입니다.';
        domEmailWrap.appendChild(el);
    }

    if (domEmailInput.value && emailPattern.test(domEmailInput.value)) {
        domEmailWrap.classList.add('complete');
        if (existingEmptyError) existingEmptyError.remove();
        if (existingFormatError) existingFormatError.remove();
        domEmailInput.style.border = '1px solid transparent';
    }

}

function passwordErrorHandler() {
    const existingPasswordEmptyError = document.querySelector('.password-empty-error');
    const existingPasswordFormatError = document.querySelector('.password-format-error');

    if (!domPasswordInput.value) {
        if (existingPasswordEmptyError) return;
        if (existingPasswordFormatError) existingPasswordFormatError.remove();
        if (domPasswordWrap.classList.remove('complete'));

        const el = document.createElement('div');
        domPasswordInput.style.border = '1px solid #F74747';
        el.classList.add('password-empty-error');
        el.innerHTML = '비밀번호를 입력해 주세요.';
        domPasswordWrap.appendChild(el);
    }

    if (domPasswordInput.value && !passwordPattern.test(domPasswordInput.value)) {
        if (existingPasswordFormatError) return;
        if (existingPasswordEmptyError) existingPasswordEmptyError.remove();

        const el = document.createElement('div');
        domPasswordInput.style.border = '1px solid #F74747';
        el.classList.add('password-format-error');
        el.innerHTML = '비밀번호를 8자 이상 입력해 주세요.';
        domPasswordWrap.appendChild(el);
    }

    if (domPasswordInput.value && passwordPattern.test(domPasswordInput.value)) {
        domPasswordWrap.classList.add('complete');
        if (existingPasswordEmptyError) existingPasswordEmptyError.remove();
        if (existingPasswordFormatError) existingPasswordFormatError.remove();
        domPasswordInput.style.border = '1px solid transparent';
    }
}

function activeLoinButton() {
    if (domEmailWrap.classList.contains('complete') && domPasswordWrap.classList.contains('complete')) {
        domLoginButton.classList.add('active');
        domLoginButton.addEventListener('click', () => window.location.href = './items.html');
    } else {
        domLoginButton.classList.remove('active');
    }
}

domEmailInput.addEventListener('blur', emailErrorHandler);
domEmailInput.addEventListener('blur', activeLoinButton);

domPasswordInput.addEventListener('blur', passwordErrorHandler);
domPasswordInput.addEventListener('blur', activeLoinButton);

