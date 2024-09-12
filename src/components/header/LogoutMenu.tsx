import { useNavigate } from "react-router-dom";
import "./LogoutMenu.css";

interface IProps {
  setSession: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutMenu: React.FC<IProps> = ({ setSession }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setSession(false);
    navigate("/");
  }  

  return (
    <div className="menuBox">
      <button className="menuBtn" onClick={handleLogout}>로그아웃</button>
    </div>
  )
}

export default LogoutMenu;