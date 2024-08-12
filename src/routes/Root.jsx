import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import UseScrollToTop from "../hooks/useScrollToTop";

const Root = () => {
  return (
    <>
      <UseScrollToTop />
      <Header />
      <Outlet />
    </>
  )
}

export default Root;