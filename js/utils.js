// 검증 끝낼 때 실행함수
export const validClearInput = (boxName) => {
  const errorSpan = boxName.querySelector("span");

  if (errorSpan) {
    errorSpan.style.display = "none";
    errorSpan.textContent = "";
  }

  boxName.classList.remove("error");
};

// 에러 띄우는 함수
export const showError = (boxName, message) => {
  let errorSpan = boxName.querySelector("span");

  // span 태그의 반복생성을 막기 위한 조건
  if (!errorSpan) {
    errorSpan = document.createElement("span");
    boxName.appendChild(errorSpan);
  }

  errorSpan.style.display = "block";
  errorSpan.textContent = message;
  boxName.classList.add("error");
};