import "./App.css";

import { Header } from "./Header";
import { BestItems } from "./BestItems";
import { AllItems } from "./AllItems";

function App() {
  return (
    <>
      <Header />
      <main>
        <BestItems />
        <AllItems />
      </main>
    </>
  );
}
export default App;
