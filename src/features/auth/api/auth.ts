import ApiInstance from "../../../shared/api/base";
import { SignInForm } from "../types/signin-form";
import { SignUpForm } from "../types/signup-form";
import { AuthResponse } from "../types/auth-response"; // 타입 임포트

// 변환된 Base64 데이터
const DefaultAvatarBase64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARpSURBVHgBvViLcdtGEN0DQQLUhyKoT0RZmSErsFJBpBLSgTuwXIGkCsxUYKeClGC6A6UCYiYK6UiKQIf6EQSw2YUEGgTxOSCw3gz4we3dvdvd2907AQXx5+jqsCKU1+h5h0KIAwRoAmDzqVWMAdGkHyYIOPfA+fxju92HAhB5hAcDq1nTnWPq9vYbGempTPro21A567YNU7qXjBATq2ruqRD4FkqB+ChLNJPg8MvlMaJykl9jmVOb5Ban++2t31Kl0hovhte98rSWQEBAb293+11ie9xLNqmmO7/TCg/hJYBwbk/Vo27XGEeblDj5muZ8ejFyDAEHrJC4piWCbFbuAC8MVsjwy9X76PsFE1+MLt8IEB9AAhT7YG21DlqtCo7rweT2HlzX9dv43epKHRRFwOTuAaZTG2SB6L7b39vtLREcjawOgkumxY7MQBuNVZ9EAJdIXl5bPrmW0ViQvb75CrY9AykgjMkfu4E/zk3sgXsiS44RJseoVBTYJGIbjbUlWV2rgTQENLW6c/LtLzxpj9LRQHaMalWF7U35sGjPHLj+Zwx5YD+qBmvR1yBrT7Yjk2s1G5AHNeqz2dogLVfk++iOH399gkIypKzUNdjyJ1IgL9g3t/KQRDj2uXFVQtN9ypLPa9YkBJsJETNlye2OFCL3c5Ygh5S8Zk0Ca7+5sS4nKyqvFUCRGZQ53hUxaxLqeg1qZPIsoCfIukp2aFmp61A22J8zIfBAJWfspMmwc0e155H/3FKGcBwHPA/9ycKL4DZ7NvPbdNLWKrWxm4Sha0zwFlKBoqmCX6onI84U1niykL7Y8cME7+4f/HcMziCPj7a/g8PgNMgLD+RiQUE707HiwgJrLgD7J08WRT1kwiQSMiGHCeYL8ZGB2ZxqxAVUVYWHh+n8vyaxIWJBeZnWLlIJIi6vnkPOkw89haDG+mL+XV9bmfsck+PCohAUNFXy93OydSdJZko+FC0M2KQtY53Ir81JhsGpbXen5W+SpPDkUGmWWeF4wlSEIvppMuzgznOdFwUTi5ILt6XFzvuQCySCztSKi94fWXK8a5NIFsEjRYBbKnCzQMvr+8v/a3RlQUa4YW2wLwW+VwRB/JQhR95vvmrvdJ9toPSyxDlU3FgTsL5OoAi4Jvz78kaSnI++z8zvrCu/yvTgiqYZUzHLgDdOnpRpg3sGAcGuYYz5AJ3WgWMfh5ekTSEDdpGaVEzEj91225wTZEw1lRmP0wYvo6IxqNRKXySagfYWCLIWqYg8i+vC5VGug08KeJGcHhPpgXIaaG+BIGN/b6cXZ+pooP6/SBqPNnkvepkUq+vh6Gp+9cG+98O2AWVj6ayMeP5qb+enqFysU0119ReO4vy7VpU/ieVBuIBAvtic3h1BXvBdyb+TO/weoFSHlCDwYrh8H5MLtm2/ofEGWDJms5lFl6Pl3D3SeB16PmB5eE9PyTe2i0QHmB8WPSd5iRVOCzQRn6cP6eFja+f5CSYfPz+80fr8TcH5MxTAf3nk3nGWJ47NAAAAAElFTkSuQmCC";

export const authSignIn = async (formData: SignInForm) => {
  try {
    const response = await ApiInstance.post("/auth/signIn", formData);

    // accessToken과 refreshToken을 sessionStorage에 저장
    sessionStorage.setItem("accessToken", response.data.accessToken);
    sessionStorage.setItem("refreshToken", response.data.refreshToken);

    // 사용자 정보 저장 (id, nickname, image)
    const { id, nickname, image } = response.data.user;
    sessionStorage.setItem("userId", id.toString());
    sessionStorage.setItem("nickname", nickname);
    if (image) {
      sessionStorage.setItem("userImage", image);
    } else {
      sessionStorage.setItem("userImage", DefaultAvatarBase64);
    }

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    alert("로그인에 실패했습니다.");
    return null;
  }
};

export const authSignUp = async (formData: SignUpForm) => {
  try {
    const response = await ApiInstance.post("/auth/signUp", formData);

    // accessToken과 refreshToken을 sessionStorage에 저장
    sessionStorage.setItem("accessToken", response.data.accessToken);
    sessionStorage.setItem("refreshToken", response.data.refreshToken);

    // 사용자 정보 저장 (id, nickname, image)
    const { id, nickname, image } = response.data.user;
    sessionStorage.setItem("userId", id.toString());
    sessionStorage.setItem("nickname", nickname);
    if (image) {
      sessionStorage.setItem("userImage", image);
    } else {
      sessionStorage.setItem("userImage", DefaultAvatarBase64);
    }

    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    alert("회원가입에 실패했습니다.");
    return null;
  }
};
