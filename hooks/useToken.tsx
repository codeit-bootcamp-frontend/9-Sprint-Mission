import Cookies from "js-cookie";
import { useSetAtom } from "jotai";
import { authAtom } from "@/atom/authAtom";

const useToken = () => {
  const setAuth = useSetAtom(authAtom);

  const setTokens = (accessToken: string | null, refreshToken: string | null) => {
    if (accessToken === null) {
      Cookies.remove("accessToken");
      setAuth(false);
    } else {
      Cookies.set("accessToken", accessToken);
      setAuth(true);
    }
    if (refreshToken === null) {
      Cookies.remove("refreshToken");
    } else {
      Cookies.set("refreshToken", refreshToken);
    }
  };

  const getAccessToken = () => Cookies.get("accessToken");
  const getRefreshToken = () => Cookies.get("refreshToken");

  return { setTokens, getAccessToken, getRefreshToken };
};

export default useToken;
