import "./App.css";
import React, { useEffect, useState } from "react";
import NavbarPanda from "./components/navbar";
import { Routes, Route } from 'react-router-dom';
import Additem from "./pages/additem/Additem";
import Items from "./pages/items/Items";
function App() {

    // 베스트 반응형 데이터
  const [favoriteData, setfavoriteData] = useState({ list: [], totalCount: 0 });
  useEffect(() => {
    const updatePageSize = () => {
      const width = window.innerWidth;
      let pageSize;
      if (width <= 767) {
        pageSize = 1;
      } else if (width <= 1199) {
        pageSize = 2;
      } else {
        pageSize = 4;
      }
      fetch(
        `https://panda-market-api.vercel.app/products?page=1&pageSize=${pageSize}&orderBy=favorite`
      )
        .then((res) => res.json())
        .then((res) => {
          setfavoriteData(res);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => {
      window.removeEventListener("resize", updatePageSize);
    };
  }, []);

  // 전체상품 반응형 데이터
  const [data, setData] = useState({ list: [], totalCount: 0 });
  const [status, setStatus] = useState("recent");
  
  useEffect(() => {
    const updatePageSize = () => {
      const width = window.innerWidth;
      let pageSize;
      if (width <= 767) {
        pageSize = 4; 
      } else if (width <= 1199) {
        pageSize = 6; 
      } else {
        pageSize = 10; 
      }

      fetch(
        `https://panda-market-api.vercel.app/products?page=1&pageSize=${pageSize}&orderBy=${status}`
      )
        .then((res) => res.json())
        .then((res) => {
          setData(res);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => {
      window.removeEventListener("resize", updatePageSize);
    };
  }, [status]); 

  return (
    <div className="App">
      <NavbarPanda/>
      <Routes>
        <Route path="/items" element={ <Items favoriteData={favoriteData} data={data} status={status} setStatus={setStatus}/> }/>
        <Route path="/additem" element={<Additem/>}/>
      </Routes>
    </div>
  );
}

export default App;
