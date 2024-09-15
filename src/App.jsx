import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemsPage from "./pages/ltemsPage/ItemsPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<ItemsPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/items/:id" element={<ItemsPage />} />
        <Route path="/additem" element={<AddItemPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
