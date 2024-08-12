import Header from './components/Header';
import Product from './components/Product';
import Paging from './components/Paging';
import './assets/styles/App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Product />
      <Paging />
    </div>
  );
}

export default App;
