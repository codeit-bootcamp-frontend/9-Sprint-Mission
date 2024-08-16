import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemsPage from "./pages/ltemsPage/ItemsPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ItemsPage />} />
        <Route path="/additem" element={<AddItemPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
