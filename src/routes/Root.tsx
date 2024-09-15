import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import useScrollToTop from "../hooks/useScrollToTop";
import { ErrorBoundary } from "react-error-boundary";
import Error from "../components/Error";

const Root = () => {
  useScrollToTop();
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <Header />
      <Outlet />
    </ErrorBoundary>
  )
}

export default Root;