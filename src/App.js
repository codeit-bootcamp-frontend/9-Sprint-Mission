import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import ItemPage from "./pages/ItemPage/ItemPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="items" element={<ItemPage />} />
                <Route path="additem" element={<AddItemPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
