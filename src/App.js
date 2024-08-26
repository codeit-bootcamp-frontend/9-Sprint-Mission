import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import HomePage from "./components/HomePage.jsx";
import AddItemForm from "./components/AddItemForm.jsx";
import ProductPage from "./Pages/ProductPage.jsx";

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
