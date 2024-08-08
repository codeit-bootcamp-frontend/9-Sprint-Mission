import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../pages/layouts/header";
import Main from "../pages/main/main";
import Footer from "../pages/layouts/footer";
import "../styles/home.css";
import UsedItemsPage from "../pages/items/Items";

function App() {
  return (
    <div className="head-area">
      <Header />
      <UsedItemsPage />
      <Footer />
    </div>
  );
}

export default App;
