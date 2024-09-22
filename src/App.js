import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header.tsx";
import Main from "./components/Main.tsx";
import HomePage from "./components/HomePage.tsx";
import AddItemForm from "./components/AddItemForm.tsx";
import ProductPage from "./Pages/ProductPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/items">
            <Route index element={<Main />} />
            <Route path=":productId" element={<ProductPage />}/>
          </Route>
          <Route path="/additem" element={<AddItemForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
