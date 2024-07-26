function idInputFocusout(e){
    if(!e.target.value){
        e.target.classList.add('red-border');
        e.target.nextElementSibling.children[0].classList.add('display');
        e.target.nextElementSibling.children[1].classList.remove('display');


    } else if(!e.target.value.includes('@') || !e.target.value.includes('.')){
        e.target.classList.add('red-border');
        e.target.nextElementSibling.children[0].classList.remove('display');
        e.target.nextElementSibling.children[1].classList.add('display');

    } else{
        e.target.classList.add('blue-border');
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
        e.target.classList.add('blue-border');
        e.target.nextElementSibling.children[0].classList.remove('display');
        e.target.nextElementSibling.children[1].classList.remove('display');
    }
}

function nicknameInput(e){
    if(!e.target.value){
        e.target.classList.add('red-border');
        e.target.classList.remove('blue-border');

        e.target.nextElementSibling.children[0].classList.add('display');

    }else{
        e.target.classList.remove('red-border');
        e.target.classList.add('blue-border');
        e.target.nextElementSibling.children[0].classList.remove('display');
    }
}

function pwCheckInput(e){
    if(!e.target.value){
        e.target.classList.add('red-border');
        e.target.classList.remove('blue-border');
        e.target.nextElementSibling.children[0].classList.add('display');
        e.target.nextElementSibling.children[1].classList.remove('display');


    }else if(e.target.value !== e.target.parentElement.children[7].value){
        e.target.classList.add('red-border');
        e.target.classList.remove('blue-border');
        e.target.nextElementSibling.children[0].classList.remove('display');
        e.target.nextElementSibling.children[1].classList.add('display');

    }else{
        e.target.classList.remove('red-border');
        e.target.classList.add('blue-border');
        e.target.nextElementSibling.children[0].classList.remove('display');
        e.target.nextElementSibling.children[1].classList.remove('display');
    }
}


function activeBtn(){
    const inputs = document.querySelectorAll('input');
    const button = document.querySelector('.submit-btn');
    let allValid = true;

    inputs.forEach(input => {
        if (input.classList.contains('red-border')|| input.value.trim() === '') {
            allValid = false;
        }
    });

    if (allValid) {
        button.removeAttribute('disabled'); // 버튼을 활성화
        button.classList.remove('disabled-btn'); // disable 클래스를 삭제
    } else {
        button.setAttribute('disabled', 'true'); // 버튼을 비활성화
        button.classList.add('disabled-btn'); // disable 클래스를 추가
    }

}
export {idInputFocusout, pwInputFocusout, nicknameInput, pwCheckInput, activeBtn};