import axios from "axios"

// 베스트상품 가져오는 함수
export const getBestProducts = async (order, pageSize, setProducts) => {
  try {
    const response = await axios.get(`https://panda-market-api.vercel.app/products/?orderBy=${order}&pageSize=${pageSize}`);

    if (response.status === 200) {
      setProducts(response.data.list);
      console.log(response.data)
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("BestProducts getBestProducts에서 오류 발생", error);
      alert("상품정보를 가져오지 못했습니다.");
    }
  }
}

// 전체상품 가져오는 함수
export const getAllProducts = async (page, pageSize, order, keyword = "", setProducts, setLoading, setError, setTotalPage) => {
  try {
    setLoading(true);
    const response = await axios.get(`https://panda-market-api.vercel.app/products/?page=${page}&orderBy=${order}&pageSize=${pageSize}&keyword=${keyword}`);

    if (response.status === 200) {
      const products = response.data;
      setProducts(products.list);
      setTotalPage(Math.ceil(products.totalCount / pageSize));
      console.log()
      setError(null);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      setError("전체 상품정보를 가져오지 못했습니다.");
      console.error("AllProducts getProducts에서 오류 발생", error);
    }
  } finally {
    setLoading(false);
  }
}