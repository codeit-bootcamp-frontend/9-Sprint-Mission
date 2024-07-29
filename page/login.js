const inputEl = document.querySelectorAll("input");

const errorText = [
  {
    name: "email",
    text: "이메일을 입력해주세요.",
    requiredText: "잘못된 이메일입니다.",
    status: false,
    required: /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+.[A-Za-z0-9-]+/,
    reqfunc(e, spanEl) {
      if (this.required.test(e.target.value) === false) {
        spanEl.textContent = this.requiredText;
        this.status = false;
      } else {
        this.status = true;
        e.target.classList.remove("focus-out");
      }
    },
  },
  {
    name: "password",
    text: "비밀번호를 입력해주세요.",
    requiredText: "비밀번호를 8자 이상 입력해주세요.",
    status: false,
    required: 8,
    reqfunc(e, spanEl) {
      if (e.target.value.length <= this.required) {
        spanEl.textContent = this.requiredText;
        this.status = false;
      } else {
        this.status = true;
        e.target.classList.remove("focus-out");
      }
    },
  },
];


  inputEl.forEach((input, idx) => {
    input.addEventListener("focusout", (e) => {
      input.nextElementSibling?.remove();
  
      const spanEl = document.createElement("span");
      spanEl.classList.add("error-text");
      input.classList.add("focus-out");
      input.after(spanEl);
  
      if (e.target.id === errorText[idx].name) {
        if (!e.target.value) {
          spanEl.textContent = errorText[idx].text;
        } else {
          errorText[idx].reqfunc(e, spanEl);
        }
      }
  
      const curStatus = errorText.every((error) => error.status);
      
      const registerBtn = document.querySelector(".register-btn");
      if (curStatus) {
        registerBtn.classList.add("active-btn");
      } else {
        registerBtn.classList.remove("active-btn");
      }
    });
  });



