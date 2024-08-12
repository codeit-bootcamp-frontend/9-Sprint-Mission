import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Items from "./pages/Items";
import Board from "./pages/Board";
import UsedMarket from "./pages/UsedMarket";
import AddItem from "./pages/AddItem";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/items" element={<Items />}></Route>
        <Route path="/board" element={<Board />}></Route>
        <Route path="/usedMarket" element={<UsedMarket />}></Route>
        <Route path="/addItem" element={<AddItem />}></Route>
      </Routes>
    </div>
  );
}

export default App;
