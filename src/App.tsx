import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ItemPage from "./pages/ItemPage/ItemPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";
import GlobalStyle from "./styles/GlobalStyle";
import ProductPage from "./pages/ProductPage/ProductPage";

const App = () => {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Header />
            <Routes>
                <Route path="items" element={<ItemPage />} />
                <Route path="items/:productId" element={<ProductPage />} />
                <Route path="additem" element={<AddItemPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
