import { useRouter } from "next/router";
import Footer from "@/components/Layout/Footer";

const FooterWrapper = () => {
  const router = useRouter();
  return router.pathname === "/" ? <Footer /> : null;
};

export default FooterWrapper;
