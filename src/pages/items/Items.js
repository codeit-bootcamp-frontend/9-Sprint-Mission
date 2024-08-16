import { Link } from 'react-router-dom';
import BestItems from '../../components/BestItems';
import AllItems from '../../components/AllItems';

function Items({favoriteData,data, status, setStatus}){
    return(
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
          <AllItems data={data}/>
        </div>
  </>
    )
}

export default Items