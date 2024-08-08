import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../styles/home.css";
import ItemsPage from "../pages/items/Items";
import RegisterItemPage from "../pages/register/register-item";
import FeedPage from "../pages/feed/feed";
import SigninPage from "../pages/signin/signin";
import HomePage from "../pages/home/home";
import Header from "../pages/layouts/header";
import Footer from "../pages/layouts/footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="head-area">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="signin" element={<SigninPage />} />
          <Route path="items" element={<ItemsPage />} />
          <Route path="additem" element={<RegisterItemPage />} />
          <Route path="feed" element={<FeedPage />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
