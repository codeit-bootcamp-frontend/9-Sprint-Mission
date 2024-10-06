import Container from "@/components/Container";
import BestProducts from "./components/BestProducts";
import Products from "./components/Products";
import axios from "@/lib/axios";

export async function getStaticProps() {
  let bestProducts;
  let posts;
  let total = 0;
  try {
    const res = await axios.get("/products?page=1&pageSize=4&orderBy=favorite");
    bestProducts = res.data.list ?? [];
  } catch (error) {
    console.error(error);
  }

  try {
    const res = await axios.get(`/products?page=1&pageSize=10&orderBy=recent`);
    posts = res.data.list ?? [];
    total = res.data.totalCount ?? 0;
  } catch (error) {
    console.error(error);
  }
  return {
    props: {
      bestProducts,
      posts,
      total,
    },
  };
}

function ItemsPage({ bestProducts, posts, total }) {
  return (
    <Container>
      <BestProducts bestProducts={bestProducts} />
      <Products initialProducts={posts} total={total} />
    </Container>
  );
}

export default ItemsPage;
