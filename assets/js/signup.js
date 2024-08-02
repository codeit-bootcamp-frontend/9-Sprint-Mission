//input 에러처리 정규표현식 
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^.{8,}$/;

const domEmailInput = document.querySelector('#input-email');
const domNameInput = document.querySelector('#input-nickname');
const domPasswordInput = document.querySelector('#input-password');
const domPasswordConfirmInput = document.querySelector('#input-password-confirm');
const domEmailWrap = document.querySelector('.form-email');
const domPasswordWrap = document.querySelector('.form-password');
const domPasswordConfirmWrap = document.querySelector('.form-password-confirm');
const domNickNameWrap = document.querySelector('.form-nickname');
const domSignButton = document.querySelector('.signup-button');
const domsPasswordButton = document.querySelectorAll('#see-password');


//이메일 에러
function emailErrorHandler() {
    const existingEmptyError = document.querySelector('.email-empty-error');
    const existingFormatError = document.querySelector('.email-format-error');

    if (!domEmailInput.value) {
        if (existingEmptyError) return; //focus가 다시 되었을 때 div를 또 생성하는 예외처리
        if (existingFormatError) existingFormatError.remove(); //형식 에러처리를 한 상황에서 빈값 에러 메시지가 하나 더 생기는 예외처리
        domEmailWrap.classList.remove('complete');

        const el = document.createElement('div');
        domEmailInput.style.border = '1px solid #F74747';
        el.classList.add('email-empty-error');
        el.innerHTML = '이메일을 입력해 주세요.';
        domEmailWrap.appendChild(el);
    }

    if (domEmailInput.value && !emailPattern.test(domEmailInput.value)) {
        if (existingFormatError) return; //focus가 다시 되었을 때 div를 또 생성하는 예외처리
        if (existingEmptyError) existingEmptyError.remove(); //빈값 에러처리를 한 상황에서 형식 에러 메시지가 하나 더 생기는 예외처리
        domEmailWrap.classList.remove('complete');

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

//비밀번호 에러 
function passwordErrorHandler() {
    const existingPasswordEmptyError = document.querySelector('.password-empty-error');
    const existingPasswordFormatError = document.querySelector('.password-format-error');

    if (!domPasswordInput.value) {
        if (existingPasswordEmptyError) return;
        if (existingPasswordFormatError) existingPasswordFormatError.remove();
        domPasswordWrap.classList.remove('complete');

        const el = document.createElement('div');
        domPasswordInput.style.border = '1px solid #F74747';
        el.classList.add('password-empty-error');
        el.innerHTML = '비밀번호를 입력해 주세요.';
        domPasswordWrap.appendChild(el);
    }

    if (domPasswordInput.value && !passwordPattern.test(domPasswordInput.value)) {
        if (existingPasswordFormatError) return;
        if (existingPasswordEmptyError) existingPasswordEmptyError.remove();
        domPasswordWrap.classList.remove('complete');

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

//비밀번호 확인 에러처리
function passwordConfirmErrorHandler() {
    if (domPasswordConfirmInput.value !== domPasswordInput.value) {
        if (document.querySelector('.password-missmatch-error')) return;
        domPasswordConfirmWrap.classList.remove('complete');

        domPasswordConfirmInput.style.border = '1px solid #F74747';
        const el = document.createElement('div');
        el.classList.add('password-missmatch-error');
        el.innerHTML = '비밀번호가 일치하지 않습니다.';
        domPasswordConfirmWrap.appendChild(el);
    }
    if (domPasswordConfirmInput.value === domPasswordInput.value) {
        domPasswordConfirmWrap.classList.add('complete');
        domPasswordConfirmInput.style.border = '1px solid transparent';
        document.querySelector('.password-missmatch-error').remove();
    }
}
//닉네임 에러처리
function nicknameErrorHandler() {
    if (!domNameInput.value) {
        if (document.querySelector('.nickname-empty-error')) return;
        domNickNameWrap.classList.remove('complete');

        const el = document.createElement('div');
        domNameInput.style.border = '1px solid #F74747';
        el.classList.add('nickname-empty-error');
        el.innerHTML = '닉네임을 입력해 주세요.';
        domNickNameWrap.appendChild(el);
    }
    if (domNameInput.value) {
        domNickNameWrap.classList.add('complete');
        domNameInput.style.border = '1px solid transparent';
        document.querySelector('.nickname-empty-error').remove();
    }
}

function activeSignpButton() {
    if (domEmailWrap.classList.contains('complete') && domPasswordWrap.classList.contains('complete') && domPasswordConfirmWrap.classList.contains('complete') && domNickNameWrap.classList.contains('complete')) {
        domSignButton.classList.add('active');
        domSignButton.addEventListener('click', () => window.location.href = './signin.html');
    } else {
        domSignButton.classList.remove('active');
    }
}

function togglePassword(e) {
    const button = e.currentTarget;
    const input = button.previousElementSibling;

    if (button.classList.contains('see')) {
        button.classList.remove('see');
        button.style.backgroundImage = 'url(/src/img/cant_see.png)';
        input.type = 'password';
    }
    else {
        button.classList.add('see');
        button.style.backgroundImage = 'url(/src/img/seePassword.png)';
        input.type = 'text';
    }
}

domEmailInput.addEventListener('blur', emailErrorHandler);
domEmailInput.addEventListener('input', emailErrorHandler);
domEmailInput.addEventListener('input', activeSignpButton);

domNameInput.addEventListener('blur', nicknameErrorHandler);
domNameInput.addEventListener('input', nicknameErrorHandler)
domNameInput.addEventListener('input', activeSignpButton);

domPasswordInput.addEventListener('blur', passwordErrorHandler);
domPasswordInput.addEventListener('input', passwordErrorHandler);
domPasswordInput.addEventListener('input', passwordConfirmErrorHandler);
domPasswordInput.addEventListener('input', activeSignpButton);

domPasswordConfirmInput.addEventListener('blur', passwordConfirmErrorHandler);
domPasswordConfirmInput.addEventListener('input', passwordConfirmErrorHandler);
domPasswordConfirmInput.addEventListener('input', activeSignpButton);

domsPasswordButton.forEach((dom) => dom.addEventListener('click', togglePassword));

