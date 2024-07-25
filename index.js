// .red-border{
//     border: 2px solid red;
// }

// .msg{    
//     display: none;
//     color: red;
//     font-size: 1.5rem;
//     font-weight: 500;
// }

// .display{
//     display: block;
// }

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
//보더 빨갛게 
//비밀번호-> 비밀번호를 입력해주세요
// 비밀번호-> 비밀번호를 8자 이상 입력해주세요
// 비밀번호 확인-> 비밀번호가 일치하지 않습니다


inputId.addEventListener('focusout', idInputFocusout);
inputPw.addEventListener('focusout', pwInputFocusout);