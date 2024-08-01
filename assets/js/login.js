const domEmailInput = document.querySelector('#email-input');
const domEmailWrap = document.querySelector('#email-wrap');
const domPasswordInput = document.querySelector('#password-input');
const domPasswordWrap = document.querySelector('#password-wrap');



function emailErrorHandler() {
    const imEmptyError = document.querySelector('.empty-error');
    const imFormatError = document.querySelector('.format-error');

    if (!domEmailInput.value) {
        if (imEmptyError) return; //focus가 다시 되었을 때 div를 또 생성하는 예외처리
        if (imFormatError) imFormatError.remove(); //형식 에러처리를 한 상황에서 빈값 에러 메시지가 하나 더 생기는 예외처리

        const el = document.createElement('div');
        domEmailInput.style.border = '1px solid #F74747';
        el.classList.add('empty-error');
        el.innerHTML = '이메일을 입력해 주세요.';
        domEmailWrap.appendChild(el);
    }

    if (domEmailInput.value && (!domEmailInput.value.includes('@') || domEmailInput.value.endsWith('.com'))) {
        if (imFormatError) return; //focus가 다시 되었을 때 div를 또 생성하는 예외처리
        if (imEmptyError) imEmptyError.remove(); //빈값 에러처리를 한 상황에서 형식 에러 메시지가 하나 더 생기는 예외처리

        const el = document.createElement('div');
        domEmailInput.style.border = '1px solid #F74747';
        el.classList.add('format-error');
        el.innerHTML = '잘못된 이메일 형식입니다.';
        domEmailWrap.appendChild(el);
    }
}

function passwordErrorHandler() {
    const imEmptyError = document.querySelector('.password-empty-error');
    const imFormatError = document.querySelector('.password-format-error')

    if (!domPasswordInput.value) {
        if (imEmptyError) return; //focus가 다시 되었을 때 div를 또 생성하는 예외처리
        if (imFormatError) imFormatError.remove(); //형식 에러처리를 한 상황에서 빈값 에러 메시지가 하나 더 생기는 예외처리

        const el = document.createElement('div');
        domPasswordInput.style.border = '1px solid #F74747';
        el.classList.add('password-empty-error');
        el.innerHTML = '비밀번호를 입력해 주세요.';
        domPasswordWrap.appendChild(el);
    }

    if (domPasswordInput.value.length < 8) {
        if (imFormatError) return; //focus가 다시 되었을 때 div를 또 생성하는 예외처리
        if (imEmptyError) imEmptyError.remove(); //형식 에러처리를 한 상황에서 빈값 에러 메시지가 하나 더 생기는 예외처리

        const el = document.createElement('div');
        domEmailInput.style.border = '1px solid #F74747';
        el.classList.add('password-format-error');
        el.innerHTML = '잘못된 이메일 형식입니다.';
        domPasswordWrap.appendChild(el);
    }

    domEmailInput.addEventListener('blur', emailErrorHandler);
    domPasswordInput.addEventListener('blur', passwordErrorHandler);