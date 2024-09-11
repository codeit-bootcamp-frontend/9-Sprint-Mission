import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import MainPage from "./routes/mainPage";
import Items from "./components/items/Items";
import AddItemPage from "./routes/addItemPage";
import FreeBoardPage from "./routes/freeBoardPage";
import ProductDetail from "./components/items/productDetail/ProductDetail";
import SigninPage from "./routes/SigninPage";
import SignupPage from "./routes/SignupPage";
import PrivacyPage from "./routes/PrivacyPage";
import FaqPage from "./routes/FaqPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/" replace />,
    },
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <MainPage /> },
        { path: "/items", element: <Items /> },
        { path: "/items/:productId", element: <ProductDetail /> },
        { path: "/privacy", element: <PrivacyPage /> },
        { path: "/faq", element: <FaqPage /> },
      ],
    },
    {
      path: "/additem",
      element: <AddItemPage />
    },
    {
      path: "/freeBoard",
      element: <FreeBoardPage />
    },
    {
      path: "/signin",
      element: <SigninPage />
    },
    {
      path: "/signup",
      element: <SignupPage />
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
