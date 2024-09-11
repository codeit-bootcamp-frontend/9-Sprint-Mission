import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ItemsPage from "../pages/market/ItemsPage";
import ItemDetailPage from "../pages/market/ItemDetailPage";
import AddItemPage from "../pages/add/AddItemPage";
import BoardPage from "../pages/board/board";
import LoginPage from "../pages/login/login";
import HomePage from "../pages/home/home";
import Header from "../pages/layouts/header";
import Footer from "../pages/layouts/footer";

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation(); // 현재 경로를 가져옴

  // HomePage 일 때만 Footer를 렌더링
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Header />
      <div className="header-area">{children}</div>
      {isHomePage && <Footer />} {/* HomePage일 때만 Footer 렌더링 */}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="items" element={<ItemsPage />} />
          <Route path="items/:productId" element={<ItemDetailPage />} />
          <Route path="additem" element={<AddItemPage />} />
          <Route path="board" element={<BoardPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
