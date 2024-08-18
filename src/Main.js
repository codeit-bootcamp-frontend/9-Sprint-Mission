import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import ItemsPage from "./pages/ItemPage";
import AddItemPage from "./pages/AddItemPage";
import CommunityPage from "./pages/CommunityPage";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="items" element={<ItemsPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="additem" element={<AddItemPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
