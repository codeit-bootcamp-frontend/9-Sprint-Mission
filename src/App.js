import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/LoginPage/Login";
import Signup from "./components/LoginPage/Signup";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage/HomePage";
import Product from "./components/ProductPage/Product";
import Community from "./components/CommunityPage/Community";
import Additem from "./components/AdditemPage/Additem";
import Detailitem from "./components/DetailitemPage/Detailitem";
import Notfound from "./components/Notfound";
import "./assets/styles/App.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="community" element={<Community />} />

          <Route path="items">
            <Route index element={<Product />} />
            <Route path=":id" element={<Detailitem />} />
            <Route path="additem" element={<Additem />} />
          </Route>
          {/* <Route path="*" element={<Notfound />} /> */}
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
