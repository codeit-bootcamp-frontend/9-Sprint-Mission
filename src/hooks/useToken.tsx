import { useContext } from "react";
import { TokenContext } from "../context/token";

const useToken = () => {
  const context = useContext(TokenContext);

  return context;
}

export default useToken;