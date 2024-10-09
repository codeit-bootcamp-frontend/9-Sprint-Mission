import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import SecondhandMarket from "./pages/SecondhandMarket";
import Mainpage from "./pages/Mainpage";
import Freeboard from "./pages/Freeboard";
import Additem from "./pages/Additem";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/items" element={<SecondhandMarket />} />
        <Route path="/boards" element={<Freeboard />} />
        <Route path="/additem" element={<Additem />} />
      </Routes>
    </>
  );
}

export default App;
