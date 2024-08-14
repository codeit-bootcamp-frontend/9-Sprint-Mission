import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/LoginPage/Login';
import Signup from './components/LoginPage/Signup';
import Footer from './components/Footer';
import HomePage from './components/HomePage/HomePage';
import Product from './components/ProductPage/Product';
import Additem from './components/AdditemPage/Additem';
import './assets/styles/App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Navigate to="/additem" />} />
          {/* <Route path="/" index element={<HomePage />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="items" element={<Product />} />
          <Route path="additem" element={<Additem />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
