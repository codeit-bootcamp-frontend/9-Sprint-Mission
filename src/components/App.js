import "./App.css";

import { Header } from "./Header";
import { BestItems } from "./BestItems";
import { AllItems } from "./AllItems";
import Pagination from "./Pagination";

function App() {
  return (
    <>
      <Header />
      <main>
        <BestItems />
        <AllItems />
      </main>
      {/* <Pagination /> */}
    </>
  );
}
export default App;
