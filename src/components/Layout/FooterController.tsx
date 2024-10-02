import { useRouter } from "next/router";
import Footer from "@/components/Layout/Footer";

const FooterController = () => {
  const router = useRouter();
  return router.pathname === "/" ? <Footer /> : null;
};

export default FooterController;
