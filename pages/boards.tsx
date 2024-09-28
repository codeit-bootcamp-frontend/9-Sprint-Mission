import BestProductCard from "@/components/BestProductCard";
import Layout from "@/components/Layout";
import { useParams } from "next/navigation";

export default function Boards() {
  const params = useParams();
  console.log(params);

  return (
    <Layout>
      <BestProductCard />
    </Layout>
  );
}
