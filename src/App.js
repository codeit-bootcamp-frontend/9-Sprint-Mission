import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import MarketPage from './pages/MarketPage/MarketPage';
import AddItemPage from './pages/AddItemPage/AddItemPage';
function App() {
  return (
    <BrowserRouter className="App">
      <Header />
      <div>
        <Routes>
          <Route path="/items" element={<MarketPage />} />
          <Route path="/additem" element={<AddItemPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
