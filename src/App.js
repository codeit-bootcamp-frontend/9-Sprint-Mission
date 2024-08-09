import "./style/global.css";
import "./components/ProductListPage/Productlist.css";
import Header from "./components/Header";
import ProductList from "./components/ProductListPage/Productlist";
import Additem from "./components/ProductListPage/Additem";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/items*" element={<ProductList />} />
        <Route path="/additem*" element={<Additem />} />
      </Routes>
    </>
  );
}

export default App;
