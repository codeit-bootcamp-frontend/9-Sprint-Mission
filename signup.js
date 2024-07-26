import { idInputFocusout, nicknameInput, pwInputFocusout, pwCheckInput } from './functions.js';


const inputId = document.querySelector('#user-name');
const inputPw = document.querySelector('#password');
const inputNickname = document.querySelector('#nickname');
const inputPwCheck = document.querySelector('#password-check');

inputId.addEventListener('focusout', idInputFocusout);
inputPw.addEventListener('focusout', pwInputFocusout);
inputNickname.addEventListener('focusout', nicknameInput);
inputPwCheck.addEventListener('focusout',pwCheckInput);