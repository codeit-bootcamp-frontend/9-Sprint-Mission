import "./App.css";
import React, { useEffect, useState } from "react";
import NavbarPanda from "./components/navbar";
import BestItems from "./components/BestItems"
import AllItems from "./components/AllItems"
import { Routes, Route, Link } from 'react-router-dom';
import axios from "axios";
function App() {

  const [favoriteData, setfavoriteData] = useState({ list: [], totalCount: 0 });

  useEffect(() => {
    axios.get(
      "https://panda-market-api.vercel.app/products?page=1&pageSize=4&orderBy=favorite"
    )
      .then((res) => {
        setfavoriteData(res.data);
      });
  }, []);


  const [data, setData] = useState({ list: [], totalCount: 0 });
  const [status, setStatus] = useState("recent")

  useEffect(() => {
    axios.get(
      `https://panda-market-api.vercel.app/products?page=1&pageSize=10&orderBy=${status}`
    )
      .then((res) => {
        setData(res.data);
      });
  }, [status]);



  return (
    <div className="App">
      
      <NavbarPanda></NavbarPanda>

      <Routes>
        <Route path="items" element={
          <>
                <BestItems favoriteData={favoriteData}></BestItems>

      
                <div className="container">
                  <div className="main-handler">
                    <div>
                      <p className="hanler-title">전체 상품</p>
                    </div>
                    <div className="handler-box">
                      <input type="text" className="handler-search"></input>
                      
                      <Link to="/additem" ><button className="handler-additem">상품 등록하기 </button></Link>
                     
                      <select onChange={()=>{setStatus(status == "favorite" ? "recent" : "favorite")}} className="handler-select">
                        <option>최신순</option>
                        <option>좋아요순</option>
                      </select>
                    </div>
                  </div>
                  <AllItems data={data}></AllItems>
                </div>
          </>}></Route>        
      </Routes>
    </div>
  );
}

export default App;
