/* App.tsx */
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ItemsPage from "../pages/market/ItemsPage";
import ItemDetailPage from "../pages/market/ItemDetailPage";
import AddItemPage from "../pages/add/AddItemPage";
import BoardPage from "../pages/board/board";
import LoginPage from "../pages/login/loginPage";
import SignupPage from "../pages/signup/signupPage";
import HomePage from "../pages/home/home";
import Header from "../pages/layouts/header";
import Footer from "../pages/layouts/footer";

// Props 타입 정의
interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Header />
      <div className="header-area">{children}</div>
      {isHomePage && <Footer />}
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
          <Route path="signup" element={<SignupPage />} />
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
