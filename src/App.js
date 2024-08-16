import "./App.css";
import React, { useEffect, useState } from "react";
import NavbarPanda from "./components/navbar";
import BestItems from "./components/BestItems"
import AllItems from "./components/AllItems"
import { Routes, Route, Link } from 'react-router-dom';
import axios from "axios";
import Additem from "./pages/additem/Additem";
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
      
      <NavbarPanda></NavbarPanda>

      <Routes>
        <Route path="/" element={
          <>
                <BestItems favoriteData={favoriteData}/>

      
                <div className="container">
                  <div className="main-handler">
                    <div>
                      <p className="hanler-title">전체 상품</p>
                    </div>
                    <div className="handler-box">
                    <input
                      type="text"
                      className="handler-search"
                      placeholder=" 🔎 검색할 상품을 입력해주세요"
                    ></input>                      
                      <Link to="/additem" ><button className="handler-additem">상품 등록하기 </button></Link>
                     
                      <select onChange={()=>{setStatus(status === "favorite" ? "recent" : "favorite")}} className="handler-select">
                        <option>최신순</option>
                        <option>좋아요순</option>
                      </select>
                    </div>
                  </div>
                  <AllItems data={data}></AllItems>
                </div>
          </>}></Route>   
          <Route path="/additem" element={<Additem/>}></Route>     
      </Routes>
    </div>
  );
}

export default App;
