import { idInputFocusout, nicknameInput, pwInputFocusout, pwCheckInput, activeBtn} from './functions.js';


const inputId = document.querySelector('#user-name');
const inputPw = document.querySelector('#password');
const inputNickname = document.querySelector('#nickname');
const inputPwCheck = document.querySelector('#password-check');

// Add event listeners for focusout events
inputId.addEventListener('focusout', idInputFocusout);
inputPw.addEventListener('focusout', pwInputFocusout);
inputNickname.addEventListener('focusout', nicknameInput);
inputPwCheck.addEventListener('focusout',pwCheckInput);

// Add event listeners
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focusout', activeBtn);
})