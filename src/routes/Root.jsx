import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import useScrollToTop from "../hooks/useScrollToTop";

const Root = () => {
  useScrollToTop();
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Root;