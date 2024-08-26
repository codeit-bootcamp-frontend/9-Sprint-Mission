import "./style/global.css";
import "./components/ProductListPage/Productlist.css";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/HomePage/Main";
import ProductList from "./components/ProductListPage/Productlist";
import Additem from "./components/AddItemPage/Additem";
import Detail from "./components/ProductDetailPage/Detail";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route
          path="/items/*"
          element={
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/:productId" element={<Detail />} />
            </Routes>
          }
        />
        <Route path="/additem*" element={<Additem />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
