import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../context/token";
import "./LogoutMenu.css";

const LogoutMenu = () => {
  const context = useContext(TokenContext); 
  
  const navigate = useNavigate();

  const handleLogout = () => {
    context?.Signout();
    navigate("/");
  }  

  return (
    <div className="menuBox">
      <button className="menuBtn" onClick={handleLogout}>로그아웃</button>
    </div>
  )
}

export default LogoutMenu;