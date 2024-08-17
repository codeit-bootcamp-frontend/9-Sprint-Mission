import { Outlet } from "react-router-dom";
import Nav from "./Nav";

function App() {
  return (
    <>
      <Nav />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
