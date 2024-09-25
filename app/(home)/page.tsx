import Footer from "@/components/footer/Footer";
import ImgWrapperBottom from "@/components/home/ImgWrapperBottom";
import ImgWrapperUpper from "@/components/home/ImgWrapperUpper";
import MainContents from "@/components/home/MainContents";
import NavBar from "@/components/navBar/NavBar";

const Home = () => {
  return (
    <NavBar>
      <ImgWrapperUpper />
      <MainContents />
      <ImgWrapperBottom />
      <Footer />
    </NavBar>
  );
}

export default Home;