import Header from "./components/Header";
import BestItems from "./components/BestItems";
import TotalItems from "./components/TotalItems";
import PageNivagator from "./components/PageNavigator";
import { useState } from "react";

function App() {
  const [page, setPage] = useState(1);

  const handlePageClick = (clickPage) => setPage(clickPage);

  return (
    <div className="App">
      <Header />
      <BestItems />
      <TotalItems currentPage={page} />
      <PageNivagator
        setPage={setPage}
        onPageClick={handlePageClick}
        currentPage={page}
      />
    </div>
  );
}

export default App;
