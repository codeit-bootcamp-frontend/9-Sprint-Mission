import "./App.css";
import "./glober.css";
import pandaLogo from "./panda-market-logo.png";
import userIcon from "./svg/userIcon.svg";
import UsedMarket from "./compornents/UsedMarket";
import CommunityBoard from "./compornents/CommunityBoard";
import Additem from "./compornents/Additem";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <AppHeader />
        <main>
          <Routes>
            <Route path="/items" index element={<UsedMarket />} />
            <Route path="/additem" element={<Additem />} />
            <Route path="/communityBoard" index element={<CommunityBoard />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

function AppHeader() {
  const location = useLocation();

  const menuItems = [
    { path: "/communityBoard", label: "자유게시판" },
    { path: "/items", label: "중고마켓" },
  ];

  return (
    <header className="App-header">
      <nav>
        <button>
          <img className="header-img" src={pandaLogo} alt="판다마켓 로고" />
        </button>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`menu ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
        <button className="usericon">
          <img src={userIcon} alt="유저의 아이콘" />
        </button>
      </nav>
    </header>
  );
}

export default App;
