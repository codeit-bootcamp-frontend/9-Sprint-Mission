const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
const usernameInput = document.querySelector('#username')
const passwordCheckInput = document.querySelector('#password-check')
const loginButton = document.querySelector('.login-button')
const passwordHide = document.querySelectorAll('.password-hide')



//포커스아웃되면  email 에러메세지 발생하는 함수
function emailInputError (e) {
    if(e.target.value === '') {
        e.target.classList.add('redbox')
        const emailErrMessege = document.createElement('span');
        emailErrMessege.textContent = '이메일을 입력해주세요';
        emailErrMessege.classList.add('errMessege');
        emailInput.after(emailErrMessege);
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(e.target.value)) {
        e.target.classList.add('redbox')
        const emailErrMessege = document.createElement('span');
        emailErrMessege.textContent = '잘못된 이메일 형식입니다';
        emailErrMessege.classList.add('errMessege');
        emailInput.after(emailErrMessege);
        return;
    }

    if(e.target.value) {
        e.target.classList.remove('redbox');
        return;
    }
    
}

//포커스인되면 email 에러메세지 제거하는 함수
function emailInputErrorRemove (e) {
    if (e.target.nextElementSibling.tagName === 'SPAN') {
        e.target.nextElementSibling.remove(); 
        }
}

//포커스아웃되면 password 에러메세지 발생하는 함수
function passwordInputError (e) {
    if(e.target.value === '') {
        e.target.classList.add('redbox')
        const passwordErrMessege = document.createElement('span');
        passwordErrMessege.textContent = '비밀번호을 입력해주세요';
        passwordErrMessege.classList.add('errMessege');
        passwordInput.parentElement.after(passwordErrMessege);
        return;
    }

    if(e.target.value.length < 8) {
        e.target.classList.add('redbox')
        const passwordErrMessege = document.createElement('span');
        passwordErrMessege.textContent = '비밀번호를 8자 이상 입력해주세요';
        passwordErrMessege.classList.add('errMessege');
        passwordInput.parentElement.after(passwordErrMessege);
        return;
    }

    if(e.target.value) {
        e.target.classList.remove('redbox');
        return;
    }
}

//포커스인되면 password 에러메세지 제거하는 함수
function passwordInputErrorRemove (e) {
    if (e.target.parentElement.nextElementSibling.tagName === 'SPAN') {
        e.target.parentElement.nextElementSibling.remove(); 
    }
}

//포커스아웃되면 username 에러메세지 발생하는 함수
function usernameInputError (e) {
    if(e.target.value === '') {
        e.target.classList.add('redbox')
        const usernameErrMessege = document.createElement('span');
        usernameErrMessege.textContent = '닉네임을 입력해주세요';
        usernameErrMessege.classList.add('errMessege');
        usernameInput.after(usernameErrMessege);
        return;
    }

    if(e.target.value) {
        e.target.classList.remove('redbox');
        return;
    }
}

//포커스인되면 username 에러메세지 제거하는 함수
function usernameInputErrorRemove (e) {
    if (e.target.nextElementSibling.tagName === 'SPAN') {
        e.target.nextElementSibling.remove(); 
        }
}

//포커스아웃되면 passwordCheck 에러메세지 발생하는 함수
function passwordCheckInputError (e) {
    if(e.target.value !== passwordInput.value) {
        e.target.classList.add('redbox')
        const passwordCheckErrMessege = document.createElement('span');
        passwordCheckErrMessege.textContent = '비밀번호가 일치하지 않습니다';
        passwordCheckErrMessege.classList.add('errMessege');
        passwordCheckInput.parentElement.after(passwordCheckErrMessege);
        return;
    }

    if(e.target.value) {
        e.target.classList.remove('redbox');
        return;
    }
}

//포커스인되면 passwordCheck 에러메세지 제거하는 함수
function passwordCheckInputErrorRemove (e) {
    if (e.target.parentElement.nextElementSibling.tagName === 'SPAN') {
        e.target.parentElement.nextElementSibling.remove(); 
    }
}

emailInput.addEventListener('focusout', emailInputError);
emailInput.addEventListener('focusin', emailInputErrorRemove);
passwordInput.addEventListener('focusout', passwordInputError);
passwordInput.addEventListener('focusin', passwordInputErrorRemove);
usernameInput.addEventListener('focusout', usernameInputError);
usernameInput.addEventListener('focusin', usernameInputErrorRemove);
passwordCheckInput.addEventListener('focusout', passwordCheckInputError);
passwordCheckInput.addEventListener('focusin', passwordCheckInputErrorRemove);

//로그인, 회원가입 버튼 비활성화 조건 함수
loginButton.addEventListener('click', function(e) {
    if (emailInput.value === '') {
        e.preventDefault();
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        e.preventDefault();
        return;
    }

    if (usernameInput.value === '') {
        e.preventDefault();
        return;
    }

    if (passwordInput.value === '') {
        e.preventDefault();
        return;
    }

    if (passwordInput.value.length < 8) {
        e.preventDefault();
        return;
    }

    if (passwordInput.value !== passwordCheckInput.value) {
        e.preventDefault();
        return;
    }
})

//비밀번호 눈가리기 함수
passwordHide.forEach(function(hide) {
    hide.addEventListener('click', function (e) {
        if (e.target.previousElementSibling.type === 'password') {
            e.target.previousElementSibling.type = '';
            e.target.classList.add('noHide');
            return;
        }

        if (e.target.previousElementSibling.type !== 'password') {
            e.target.previousElementSibling.type = 'password';
            e.target.classList.remove('noHide');
            return;
        }
    })
});