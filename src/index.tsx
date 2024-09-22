import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Additem } from "./components/Additem";
import { ItemPage } from "./components/ItemPage";

function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/items" replace />} />
        <Route path="/items" element={<App />} />
        <Route path="/items/:id" element={<ItemPage />} />
        <Route path="/additem" element={<Additem />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>
);
