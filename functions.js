
//이메일을 입력해주세요.잘못된 이메일 형식입니다.
//닉네임을 입력해주세요.
//비밀번호를 입력해주세요.비밀번호를 8자 이상 입력해주세요.비밀번호가 일치하지 않습니다.


//인풋 아이디(user-name, new-pw, nickname, pw-check)에 따라 전달받은 메시지를 출력하는 함수
function addMessage(inputID, i, msg){
    const selectedInput = document.getElementById(inputID);
    const divArea = document.querySelectorAll('.msg-area');
    divArea[i].innerHTML = msg;
    if(!divArea){
        selectedInput.nextElementSibling.append(divArea);
    }
}

// 선택한 인풋 박스에 빨간색 테두리를 표시해주는 함수 &파란색 테두리를 지움
function redBorder(inputID){
    const selectedInput = document.getElementById(inputID);
    selectedInput.classList.add('red-border');
    selectedInput.classList.remove('blue-border');
}

// 정상 작동 시 호출될 함수 (파란색 테두리 & 에러메시지 지움)
function correct(inputID, i){
    const selectedInput = document.getElementById(inputID);
    const divArea = document.querySelectorAll('.msg-area');

    selectedInput.classList.add('blue-border');
    if(divArea[i]){
        divArea[i].innerHTML = "";
    }
}

//인풋박스 포커스 이벤트 핸들러
function InputFocusout(e, idName, i, errMsg1, errMsg2){
    const value = e.target.value;
    //이메일 입력 인풋에서 
    if(idName === 'user-name'){
        //인풋에 값이 없을때
        if(!value){
            addMessage(idName, i, errMsg1);
            redBorder(idName);
        } 
        //인풋값이 잘못된 형식일때
        else if (!value.includes('@') || !value.includes('.')){
            addMessage(idName, i, errMsg2);
            redBorder(idName);
        }
        // 그외 나머지 = 정상작동
        else{
            correct(idName, i);
        }
    }
    //닉네임 입력 인풋에서
    else if(idName === 'nickname'){
        if(!value){
            addMessage(idName, i, errMsg1);
            redBorder(idName);
        } 
        else{
            correct(idName, i);
        }
    }

    //비밀번호 입력 인풋에서
    else if(idName === 'new-pw'){
        if(!value){
            addMessage(idName, i, errMsg1);
            redBorder(idName);
        } 
        //8글자 미만일때
        else if (value.length < 8){
            addMessage(idName, i, errMsg2);
            redBorder(idName);
        }
        // 그외 나머지 = 정상작동
        else{
            correct(idName, i);
        }
    }

    //비밀번호 확인 인풋에서
    else if(idName === 'pw-check'){
        const pwValue = document.querySelector('#new-pw').value;
        // console.log(pwValue); 
        if(!value){
            addMessage(idName, i, errMsg1);
            redBorder(idName);
        } 
        //일치하지 않을때
        else if (value !== pwValue ){
            addMessage(idName, i, errMsg2);
            redBorder(idName);
        }
        // 그외 나머지 = 정상작동
        else{
            correct(idName, i);
        }
    }
}

const inputId = document.querySelector('#user-name');
const inputNickname = document.querySelector('#nickname');
const inputPw = document.querySelector('#new-pw');
const inputPwCheck = document.querySelector('#pw-check');

//포커스 아웃 이벤트 리스너 할당하기
inputId.addEventListener('focusout', (e) => {
    InputFocusout(e, 'user-name', 0, '이메일을 입력해주세요.', '잘못된 이메일 형식입니다.');
});
if(inputNickname){
    inputNickname.addEventListener('focusout', (e) => {
        InputFocusout(e, 'nickname', 1, '닉네임을 입력해주세요.');
    });
}
if(inputPwCheck){
    inputPw.addEventListener('focusout', (e) => {
        InputFocusout(e, 'new-pw', 2, '비밀번호를 입력해주세요.', '비밀번호를 8자 이상 입력해주세요.');
    });
}

if(!inputPwCheck){
    inputPw.addEventListener('focusout', (e) => {
    InputFocusout(e, 'new-pw', 1, '비밀번호를 입력해주세요.', '비밀번호를 8자 이상 입력해주세요.');
    });
}

if(inputPwCheck){
    inputPwCheck.addEventListener('focusout', (e) => {
        InputFocusout(e, 'pw-check', 3, '비밀번호를 한번 더 입력해주세요', '비밀번호가 일치하지 않습니다.');
    })
}

// 버튼 비활성화 핸들러
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
//  버튼 비활성화 이벤트 할당
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focusout', activeBtn);
})