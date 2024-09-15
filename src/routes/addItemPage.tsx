import { ErrorBoundary } from "react-error-boundary";
import AddItem from "../components/addItem/AddItem";
import Header from "../components/header/Header";
import Error from "../components/Error";

const addItemPage = () => {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <Header />
      <AddItem />
    </ErrorBoundary>
  )
}

export default addItemPage;