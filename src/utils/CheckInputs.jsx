const CheckInputs = ({ params }) => {
  const { name, description, price, tags } = params;
  const checkTextRegex = /^[a-zA-Z0-9ㄱ-ㅎ가-힣\s!?'().,:;#-]+$/;
  const checkNumRegex = /^(0|[1-9]\d*)(\.\d+)?$/;
  const checkTagRegex = /^[a-zA-Z0-9ㄱ-ㅎ가-힣#]+$/;
  
  let isValid = true;

  if (!checkTextRegex.test(name)) {
    console.log("상품명 잘못됨")
    isValid = false;
  } else if (!checkTextRegex.test(description)) {
    console.log("상품설명 잘못됨")
    isValid = false;
  } else if (!checkNumRegex.test(price) || price < 0) {
    console.log("가격 잘못됨")
    isValid = false;
  } else if (tags.some((item) => !checkTagRegex.test(item.name))) {
    console.log("태그 잘못됨")
    isValid = false;
  } 
  
  return isValid;
};

export default CheckInputs;
