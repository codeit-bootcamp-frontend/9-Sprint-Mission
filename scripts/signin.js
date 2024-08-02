function emailCheck(emailAddress) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(emailAddress);
}

function passwordCheck(password) {
  return password.length >= 8;
}

document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginButton = document.getElementById("loginButton");
  const loginForm = document.getElementById("loginForm");

  /* error = true -> 에러가 있다. */
  let hasEmailError = true;
  let hasPasswordError = true;

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

    if (!hasEmailError && !hasPasswordError) {
      loginButton.disabled = false;
    } else {
      loginButton.disabled = true;
    }
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

    if (!hasEmailError && !hasPasswordError) {
      loginButton.disabled = false;
    } else {
      loginButton.disabled = true;
    }
  });

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    window.location.href = "./items.html";
  });
});
