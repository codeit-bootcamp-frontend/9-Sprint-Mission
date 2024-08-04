document.addEventListener("DOMContentLoaded", () => {

	// 값을 확인하기 위한 변수 지정
	let isEmailValid = false;
	let isNicknameValid = false;
	let isPasswordValid = false;
	let isPasswordConfirmValid = false;

	// Dom 요소 접근하는 변수
	const loginForm = document.getElementById("login");
	const signupForm = document.getElementById("sign-up")
	const emailInput = document.querySelector(".signup-email");
	const nicknameInput = document.querySelector(".signup-id");
	const passwordInput = document.querySelector(".signup-pw");
	const passwordConfirmInput = document.querySelector(".signup-pw-confirm");

	const submitButton = document.querySelector('.login-button[type="submit"]');


	// 오류 메세지 함수
	function showError(input, errorId) {
		const errorElement = document.getElementById(errorId);
		errorElement.style.display = "block";
		input.style.border = "3px solid #f74747";
	}

	function hideError(input, errorId) {
		const errorElement = document.getElementById(errorId);
		errorElement.style.display = "none";
		input.style.border = "none";
	}

	// 이메일 값 확인 함수
	function validEmailString(email) {
    const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return strictEmailRegex.test(email);
	}

	function checkEmailValid() {
		const emailValue = emailInput.value.trim();

		isEmailValid = false;
		hideError(emailInput, "emailEmptyError");
		hideError(emailInput, "emailInvalidError");

		if (!emailValue) {
			showError(emailInput, "emailEmptyError");
		} else if (!validEmailString(emailValue)) {
			showError(emailInput, "emailInvalidError");
		} else {
			isEmailValid = true;
			hideError(emailInput, "emailEmptyError");
			hideError(emailInput, "emailInvalidError");
		}

		updateSubmitButtonState();
	}

	//닉네임 확인 함수
	function checkNicknameValid() {
		const nicknameValue = nicknameInput.value.trim();

		isNicknameValid = false;
		hideError(nicknameInput, "nicknameEmptyError");

		if (!nicknameValue) {
			showError(nicknameInput, "nicknameEmptyError");
		} else {
			isNicknameValid = true;
			hideError(emailInput, "nicknameEmptyError");
		}

		updateSubmitButtonState();
	}

	// 비밀번호 확인 함수
	function checkPasswordValid() {
		const passwordValue = passwordInput.value.trim();

		isPasswordValid = false;
		hideError(passwordInput, "passwordEmptyError");
		hideError(passwordInput, "passwordInvalidError");

		if (!passwordValue) {
			showError(passwordInput, "passwordEmptyError");
		} else if (passwordValue.length < 8) {
			showError(passwordInput, "passwordInvalidError");
		} else {
			isPasswordValid = true;
			hideError(passwordInput, "passwordEmptyError");
			hideError(passwordInput, "passwordInvalidError");
		}

		updateSubmitButtonState();

		// 비밀번호 입력 전에 비밀번호 확인을 먼저 입력하지 못하도록 하는 로직
		if (signupForm) {
			checkPasswordConfirmValid();
		}
	}

		// 비밀번호 확인란 검사
		function checkPasswordConfirmValid() {
			const passwordConfirmValue = passwordConfirmInput.value.trim();
			isPasswordConfirmValid = false;

			hideError(passwordConfirmInput, "passwordConfirmError");
			hideError(passwordConfirmInput, "passwordConfirmInitError");

			if (!isPasswordValid) {
				showError(passwordConfirmInput, "passwordConfirmInitError");
			} else if (!passwordConfirmValue || 
				passwordConfirmValue !== passwordInput.value.trim()
			) {
				showError(passwordConfirmInput, "passwordConfirmError");
			} else {
				isPasswordConfirmValid = true;
				hideError(passwordConfirmInput, "passwordConfirmError");
				hideError(passwordConfirmInput, "passwordConfirmInitError");
			}

			updateSubmitButtonState();
		}

		// 버튼 비활성화
		function updateSubmitButtonState() {
			let isFormValid = isEmailValid && isPasswordValid;

			if (signupForm) {
				isFormValid = isFormValid && isNicknameValid && isPasswordConfirmValid;
			}

			submitButton.disabled = !isFormValid;
		}

		// 이벤트 추가
		if (emailInput) {
			emailInput.addEventListener("focusout", checkEmailValid);
		}
		if (nicknameInput) {
			nicknameInput.addEventListener("focusout", checkNicknameValid);
		}
		if (passwordInput) {
			passwordInput.addEventListener("input", checkPasswordValid);
		}
		if (passwordConfirmInput) {
			passwordConfirmInput.addEventListener("input", checkPasswordConfirmValid);
		}

		updateSubmitButtonState();

		// 페이지 이동
		if (loginForm) {
			loginForm.addEventListener("submit", function (event) {
				event.preventDefault();
				window.location.href = "./items.html"
			});
		}

		if (signupForm) {
			signupForm.addEventListener("submit", function (event) {
				event.preventDefault();
				window.location.href = "./signin.html";
			});
		}

		function togglePasswordVisible(event) {
			event.preventDefault();

			const button = event.currentTarget;
			const inputField = button.parentElement.querySelector("input");
			const toggleIcon = button.querySelector("img");

			const isPasswordVisible = inputField.type === "text";
			inputField.type = isPasswordVisible ? "password" : "text";

			toggleIcon.src = isPasswordVisible
				? "./images/logo/eye-invisible.svg" 
				: "./images/logo/eye-visible.svg";
			toggleIcon.alt = isPasswordVisible
				? "비밀번호 표시" 
				: "비밀번호 숨김";
		}

		const toggleButtons = document.querySelectorAll(".password-toggle-icon");
		toggleButtons.forEach((icon) =>
			icon.parentElement.addEventListener("click", togglePasswordVisible)
		);
})