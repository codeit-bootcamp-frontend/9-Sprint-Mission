const errorAlert = (title) => {
  alert(`${title}에 입력한 내용을 다시 확인해주세요.`);
};

const CheckInputs = ({ params }) => {
  const { name, description, price, tags } = params;
  const checkTextRegex = /^[a-zA-Z0-9ㄱ-ㅎ가-힣\s!?'().,:;#-]+$/;
  const checkNumRegex = /^(0|[1-9]\d*)(\.\d+)?$/;
  const checkTagRegex = /^[a-zA-Z0-9ㄱ-ㅎ가-힣#]+$/;

  const error = [];

  if (!checkTextRegex.test(name)) {
    error.push("상품명");
  } else if (!checkTextRegex.test(description)) {
    error.push("상품 소개");
  } else if (!checkNumRegex.test(price) || price < 0) {
    error.push("판매 가격");
  } else if (tags.some((item) => !checkTagRegex.test(item.name))) {
    error.push("태그");
  }

  if (error.length > 0) {
    errorAlert(error.join(", "));
    return false;
  }

  return true;
};

export default CheckInputs;
