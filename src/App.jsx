import "./App.css";
import "./glober.css";
import pandaLogo from "./panda-market-logo.png";
import userIcon from "./svg/userIcon.svg";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <button href="/">
            <img className="header-img" src={pandaLogo} alt="판다마켓 로고" />
          </button>
          <button className="communityBoard">자유게시판</button>
          <button className="usedMarket">중고마켓</button>
          <button>
            <img src={userIcon} />
          </button>
        </nav>
      </header>
    </div>
  );
}

export default App;
