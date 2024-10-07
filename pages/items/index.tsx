import Container from "@/components/Container";
import BestProducts from "./components/BestProducts";
import Products from "./components/Products";
import axios from "@/lib/axios";
import { GetStaticProps } from "next";
import { Product } from "@/types/types";

interface ItemsPageProps {
  bestProducts: Product[];
  posts: Product[];
  total: number;
}

export const getStaticProps: GetStaticProps<ItemsPageProps> = async () => {
  let bestProducts: Product[] = [];
  let posts: Product[] = [];
  let total = 0;

  try {
    const res = await axios.get("/products?page=1&pageSize=4&orderBy=favorite");
    bestProducts = res.data.list ?? [];
    console.log("Best Products:", res.data);
  } catch (error) {
    console.error("Error fetching best products:", error);
  }

  try {
    const res = await axios.get(`/products?page=1&pageSize=10&orderBy=recent`);
    posts = res.data.list ?? [];
    total = res.data.totalCount ?? 0;
    console.log("Recent Posts:", res.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return {
    props: {
      bestProducts,
      posts,
      total,
    },
  };
};

function ItemsPage({ bestProducts, posts, total }: ItemsPageProps) {
  return (
    <Container>
      <BestProducts bestProducts={bestProducts} />
      <Products initialProducts={posts} total={total} />
    </Container>
  );
}

export default ItemsPage;
