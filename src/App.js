import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Items from "./components/items/Items";
import AddItemPage from "./routes/addItemPage";
import FreeBoardPage from "./routes/freeBoardPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/items" replace />,
    },
    {
      path: "/items",
      element: <Root />,
      children: [
        { index: true, element: <Items /> },
        { path: "/items/additem", element: <AddItemPage /> }
      ],
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
