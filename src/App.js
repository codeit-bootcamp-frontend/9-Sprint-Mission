import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./components/Main.tsx";
import HomePage from "./Pages/HomePage";
import AddItemForm from "./components/AddItemForm.tsx";
import ProductPage from "./Pages/ProductPage.tsx";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/items">
          <Route index element={<Main />} />
          <Route path=":productId" element={<ProductPage />} />
        </Route>
        <Route path="/additem" element={<AddItemForm />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
