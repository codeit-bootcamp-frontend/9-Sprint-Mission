
const inputId = document.querySelector('#user-name');
const inputPw = document.querySelector('#password');


function idInputFocusout(e){
    if(!e.target.value){
        e.target.classList.add('red-border');
        e.target.nextElementSibling.children[0].classList.add('display');
    } else if(!e.target.value.includes('@') || !e.target.value.includes('.')){
        e.target.classList.add('red-border');
        e.target.nextElementSibling.children[0].classList.remove('display');
        e.target.nextElementSibling.children[1].classList.add('display');
    } else{
        e.target.classList.remove('red-border');
        e.target.nextElementSibling.children[0].classList.remove('display');
        e.target.nextElementSibling.children[1].classList.remove('display');
    }
}

function pwInputFocusout(e){
    if(!e.target.value){
        e.target.classList.add('red-border');
        e.target.nextElementSibling.children[0].classList.add('display');
    } else if(e.target.value.length < 8){
        e.target.classList.add('red-border');
        e.target.nextElementSibling.children[0].classList.remove('display');
        e.target.nextElementSibling.children[1].classList.add('display');
    } else{
        e.target.classList.remove('red-border');
        e.target.nextElementSibling.children[0].classList.remove('display');
        e.target.nextElementSibling.children[1].classList.remove('display');
    }
}

inputId.addEventListener('focusout', idInputFocusout);
inputPw.addEventListener('focusout', pwInputFocusout);