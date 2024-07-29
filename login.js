import { idInputFocusout, pwInputFocusout, activeBtn } from './functions.js';


const inputId = document.querySelector('#user-name');
const inputPw = document.querySelector('#password');

// Add event listeners for focusout events
inputId.addEventListener('focusout', idInputFocusout);
inputPw.addEventListener('focusout', pwInputFocusout);


// Add event listeners
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focusout', activeBtn);
})