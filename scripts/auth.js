$(function () {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

  $("#loginButton").prop("disabled", true);

  function isValidEmail(email) {
    return emailPattern.test(email);
  }

  $("#email").on("focusout", function () {
    const emailVal = $("#email").val();

    if (!emailVal) {
      $("#email").addClass("error-line");
      $("#empty-email").text("이메일을 입력해주세요.");
      $("#invalid-email").text("");
    } else if (!isValidEmail(emailVal)) {
      $("#email").addClass("error-line");
      $("#empty-email").text("");
      $("#invalid-email").text("잘못된 이메일 형식입니다.");
    } else if (isValidEmail(emailVal)) {
      $("#email").removeClass("error-line");
      $("#empty-email").text("");
      $("#invalid-email").text("");
    }
  });

  $("#password").on("focusout", function () {
    const passwordVal = $("#password").val();

    if (!passwordVal) {
      $("#password").addClass("error-line");
      $("#empty-password").text("비밀번호를 입력해주세요.");
      $("#short-password").text("");
    } else if (passwordVal.length < 8) {
      $("#password").addClass("error-line");
      $("#empty-password").text("");
      $("#short-password").text("비밀번호를 8자 이상 입력해주세요.");
    } else if (passwordVal.length >= 8) {
      $("#password").removeClass("error-line");
      $("#empty-password").text("");
      $("#short-password").text("");
    }
  });

  $("#password").keydown(function (e) {
    if (e.keyCode === 13) {
      // enter key(13) 눌렀을 때 이벤트
      if (isValidEmail($("#email").val()) && $("#password").val().length >= 8) {
        submitLogin();
      }
    }
  });

  $("input").keydown(function (e) {
    if (isValidEmail($("#email").val()) && $("#password").val().length >= 8) {
      $("#loginButton").prop("disabled", false);
    } else {
      $("#loginButton").prop("disabled", true);
    }
  });

  function submitLogin() {
    $("#loginForm").submit();
  }
});
