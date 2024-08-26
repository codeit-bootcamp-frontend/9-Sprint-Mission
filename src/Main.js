import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import ItemsPage from "./pages/ItemsPage";
import AddItemPage from "./pages/AddItemPage";
import CommunityPage from "./pages/CommunityPage";
import ItemDetailPage from "./pages/ItemDetailPage";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="items">
            <Route index element={<ItemsPage />} />
            <Route path=":itemId" element={<ItemDetailPage />} />
          </Route>
          <Route path="community" element={<CommunityPage />} />
          <Route path="additem" element={<AddItemPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
