import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import MarketPage from './pages/MarketPage/MarketPage';
import AddItemPage from './pages/AddItemPage/AddItemPage';
import HomePage from './pages/HomePage/HomePage';
import './styles/global.css';
import { CommunityPage } from './pages/CommunityPage/CommunityPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="TopHeader">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="items" element={<MarketPage />} />
          <Route path="additem" element={<AddItemPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
