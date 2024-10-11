import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HeroBottom } from "@/components/HeroBottom";

export default function index() {
  return (
    <>
      <Hero />
      <div className="container"></div>
      <HeroBottom />
      <Footer />
    </>
  );
}
