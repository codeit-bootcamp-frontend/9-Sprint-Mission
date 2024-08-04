function emailCheck(emailAddress) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(emailAddress);
}

function passwordCheck(password) {
  return password.length >= 8;
}

function enableLoginButton(a, b) {
  if (!a && !b) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

function enableSignupButton(a, b, c, d) {
  if (!a && !b && !c && !d) {
    signupButton.disabled = false;
  } else {
    signupButton.disabled = true;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const nicknameInput = document.getElementById("nickname");
  const passwordConfirmationInput = document.getElementById(
    "passwordConfirmation"
  );

  const loginButton = document.getElementById("loginButton");
  const signupButton = document.getElementById("signupButton");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  /* error = true -> 에러가 있다. */
  let hasEmailError = true;
  let hasPasswordError = true;
  let hasNicknameError = true;
  let hasPasswordConfirmationError = true;

  emailInput.addEventListener("focusout", function () {
    const emailError = document.getElementById("email-error");
    const wrongEmailError = document.getElementById("wrong-email-error");
    let email = emailInput.value;

    if (!emailInput.value) {
      emailInput.classList.add("error");
      emailError.style.display = "block";
      wrongEmailError.style.display = "none";
      hasEmailError = true;
    } else if (!emailCheck(email)) {
      emailInput.classList.add("error");
      emailError.style.display = "none";
      wrongEmailError.style.display = "block";
      hasEmailError = true;
    } else {
      emailInput.classList.remove("error");
      emailError.style.display = "none";
      wrongEmailError.style.display = "none";
      hasEmailError = false;
    }

    enableLoginButton(hasEmailError, hasPasswordError);
    enableSignupButton(
      hasEmailError,
      hasPasswordError,
      hasNicknameError,
      hasPasswordConfirmationError
    );
  });

  passwordInput.addEventListener("focusout", function () {
    const passwordError = document.getElementById("password-error");
    const wrongPasswordError = document.getElementById("wrong-password-error");
    let password = passwordInput.value;

    if (!passwordInput.value) {
      passwordInput.classList.add("error");
      passwordError.style.display = "block";
      wrongPasswordError.style.display = "none";
      hasPasswordError = true;
    } else if (!passwordCheck(password)) {
      passwordInput.classList.add("error");
      passwordError.style.display = "none";
      wrongPasswordError.style.display = "block";
      hasPasswordError = true;
    } else {
      passwordInput.classList.remove("error");
      passwordError.style.display = "none";
      wrongPasswordError.style.display = "none";
      hasPasswordError = false;
    }

    enableLoginButton(hasEmailError, hasPasswordError);
    enableSignupButton(
      hasEmailError,
      hasPasswordError,
      hasNicknameError,
      hasPasswordConfirmationError
    );
  });

  nicknameInput.addEventListener("focusout", function () {
    const nicknameError = document.getElementById("nickname-error");

    if (!nicknameInput.value) {
      nicknameInput.classList.add("error");
      nicknameError.style.display = "block";
      hasNicknameError = true;
    } else {
      nicknameInput.classList.remove("error");
      nicknameError.style.display = "none";
      hasNicknameError = false;
    }

    enableSignupButton(
      hasEmailError,
      hasPasswordError,
      hasNicknameError,
      hasPasswordConfirmationError
    );
  });

  passwordConfirmationInput.addEventListener("focusout", function () {
    const passwordConfirmationError = document.getElementById(
      "passwordConfirmation-error"
    );

    if (passwordInput.value !== passwordConfirmationInput.value) {
      passwordConfirmationInput.classList.add("error");
      passwordConfirmationError.style.display = "block";
      hasPasswordConfirmationError = true;
    } else {
      passwordConfirmationInput.classList.remove("error");
      passwordConfirmationError.style.display = "none";
      hasPasswordConfirmationError = false;
    }

    enableSignupButton(
      hasEmailError,
      hasPasswordError,
      hasNicknameError,
      hasPasswordConfirmationError
    );
  });

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    window.location.href = "./items.html";
  });

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    window.location.href = "./signin.html";
  });
});
