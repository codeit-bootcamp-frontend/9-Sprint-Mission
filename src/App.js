import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import HomePage from "./components/HomePage.jsx";
import AddItemForm from "./components/AddItemForm.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/items" element={<Main />} />
          <Route path="/additem" element={<AddItemForm/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
