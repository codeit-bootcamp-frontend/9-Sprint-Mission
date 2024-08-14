import "./style/global.css";
import "./components/ProductListPage/Productlist.css";
import Header from "./components/Header";
import ProductList from "./components/ProductListPage/Productlist";
import Additem from "./components/AddItemPage/Additem";
import { Route, Routes } from "react-router-dom";
import Main from "./components/HomePage/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/items*" element={<ProductList />} />
        <Route path="/additem*" element={<Additem />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
