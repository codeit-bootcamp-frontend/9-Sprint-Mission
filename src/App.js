import Header from './components/Header';
import Product from './components/Product';
import Paging from './components/Paging';
import './assets/styles/App.scss';

function App() {
  return (
    <div className="App">
      <header className="Header">
        <Header />
      </header>
      <section className="Product">
        <Product />
      </section>
      <footer className="Paging">
        <Paging />
      </footer>
    </div>
  );
}

export default App;
