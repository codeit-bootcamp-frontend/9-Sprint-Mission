function emailCheck(emailAddress) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  console.log(emailRegex.test(emailAddress));
  return emailRegex.test(emailAddress);
}

function passwordCheck(password) {
  return password.length >= 8;
}

document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("email-error");
  const wrongEmailError = document.getElementById("wrong-email-error");

  const passwordInput = document.getElementById("password");
  const passwordError = document.getElementById("password-error");
  const wrongPasswordError = document.getElementById("wrong-password-error");

  emailInput.addEventListener("focusout", function () {
    let email = emailInput.value;

    if (!emailInput.value) {
      emailInput.classList.add("error");
      emailError.style.display = "block";
      wrongEmailError.style.display = "none";
    } else if (!emailCheck(email)) {
      emailInput.classList.add("error");
      emailError.style.display = "none";
      wrongEmailError.style.display = "block";
    } else {
      emailInput.classList.remove("error");
      emailError.style.display = "none";
      wrongEmailError.style.display = "none";
    }
  });

  passwordInput.addEventListener("focusout", function () {
    let password = passwordInput.value;

    if (!passwordInput.value) {
      passwordInput.classList.add("error");
      passwordError.style.display = "block";
      wrongPasswordError.style.display = "none";
    } else if (!passwordCheck(password)) {
      passwordInput.classList.add("error");
      passwordError.style.display = "none";
      wrongPasswordError.style.display = "block";
    } else {
      passwordInput.classList.remove("error");
      passwordError.style.display = "none";
      wrongPasswordError.style.display = "none";
    }
  });
});
