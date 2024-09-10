import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import MainPage from "./routes/mainPage";
import Items from "./components/items/Items";
import AddItemPage from "./routes/addItemPage";
import FreeBoardPage from "./routes/freeBoardPage";
import ProductDetail from "./components/items/productDetail/ProductDetail";

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
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
