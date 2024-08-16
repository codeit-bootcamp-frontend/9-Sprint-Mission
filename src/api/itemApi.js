export async function getProducts(options = {}) {
	//options라는 이름으로 굳이 인자생성하지 않아도 됨.  
	const query = new URLSearchParams(options).toString();
	//query는 params(options)객체를 URL 쿼리 스트링으로 변환한 결과를 저장해준다
	//변환된 문자열은 api 요청되며 url에 붙어 서버로 전송된다.
	//URLSearchParams는 주어진 객체를 URL의 쿼리 파라미터로 변환해준다.

	try {
		const response = await fetch(
			`https://panda-market-api.vercel.app/products?${query}`
		);
		if (!response.ok) {//이 부분은 HTTP 응답이 성공적이지 않을때
			throw new Error(`HTTP error: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {// 이 부분은 코드에 오류가 있을때
		console.error("Failed to fetch products:", error);
		throw error;
	}
}