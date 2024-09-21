import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MarketPage from "./pages/MarketPage/MarketPage";
import ProductDetailPage from "./pages/ItemDetailPage/ProductDetailPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";
import CommunityFeedPage from "./pages/CommunityFeedPage/CommunityFeedPage";
import Header from "./components/Layout/Header";

function App() {
  return (
    <Router>
      <Header />
      <div className="withHeader">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="items" element={<MarketPage />} />
          <Route path="/items/:productId" element={<ProductDetailPage />} />
          <Route path="additem" element={<AddItemPage />} />
          <Route path="community" element={<CommunityFeedPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
