import { idInputFocusout, pwInputFocusout } from './functions.js';


const inputId = document.querySelector('#user-name');
const inputPw = document.querySelector('#password');


inputId.addEventListener('focusout', idInputFocusout);
inputPw.addEventListener('focusout', pwInputFocusout);