export const getItems = async (params = {}) => {
  // 기본값을 params 객체의 프로퍼티로 할당

  const { page = 1, pageSize = 10, orderBy = 'orderBy', keyword = 'keyword' } = params;

  // 쿼리 문자열 생성
  const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`;

  // API 요청
  const response = await fetch(`https://panda-market-api.vercel.app/products?${query}`);

  // 응답 확인
  if (!response.ok) {
    throw new Error('데이터를 불러오지 못했습니다.');
  }

  // JSON 파싱
  const data = await response.json();

  // 데이터 확인
  // console.log(data);

  // 데이터 반환
  return data;
};
