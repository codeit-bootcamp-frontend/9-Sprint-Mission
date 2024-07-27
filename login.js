// 모든 .password-box 요소 선택
const passwordBoxes = document.querySelectorAll('.password-box');

// 각각의 .password-box에 대해 반복
passwordBoxes.forEach((e) => {
    // 비밀번호 입력 필드와 버튼 선택
    const eyeButton = e.querySelector('.eye');
    const password = e.querySelector('.password');

    let isVisible = false;

    // 버튼 클릭 이벤트 리스너 추가
    eyeButton.addEventListener('click', () => {
        if (isVisible) {
            password.setAttribute('type', 'password');
            eyeButton.innerHTML = "<img src='images/eye.svg' class='eye-img' width='24px' height='24px' alt='eye'>"; // eye 아이콘으로 변경
        } else {
            password.setAttribute('type', 'text');
            eyeButton.innerHTML = "<img src='images/eye.svg' class='eye-img' width='24px' height='24px' alt='eye-slash'>"; // eye-slash 아이콘으로 변경
        }
        isVisible = !isVisible;
    });
});

