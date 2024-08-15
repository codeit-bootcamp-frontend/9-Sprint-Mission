import { BrowserRouter, Route, Routes } from "react-router-dom";
import ItemsPage from "../pages/market/Items";
import AddItemPage from "../pages/add/add-item";
import BoardPage from "../pages/board/board";
import LoginPage from "../pages/login/login";
import HomePage from "../pages/home/home";
import Header from "../pages/layouts/header";
import Footer from "../pages/layouts/footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="header-area">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="items" element={<ItemsPage />} />
          <Route path="additem" element={<AddItemPage />} />
          <Route path="board" element={<BoardPage />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
