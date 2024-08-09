import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import ScrollToTop from "../components/ScrollToTop";

const Root = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
    </>
  )
}

export default Root;