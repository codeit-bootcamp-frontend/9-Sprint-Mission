import React from "react";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const ItemList = ({ item, order, setOrder, windowSize }) => {
    const handleOrderChange = (e) => {
        setOrder(e.target.value);
    };

    return (
        <div className="itemList">
            <div className="topNav">
                <h2>전체 상품</h2>
                <div className="topNavRigth">
                    <input placeholder="검색할 상품을 입력해주세요"></input>
                    <Link to={"/additem"}>상품 등록하기</Link>
                    <select
                        name="sort"
                        onChange={handleOrderChange}
                        defaultValue="recent"
                    >
                        <option value="recent">최신순</option>
                        <option value="favorite">좋아요순</option>
                    </select>
                </div>
            </div>
            <div className="items">
                {item.slice(0, windowSize).map((item) => {
                    return <ProductItem key={item.id} item={item} />;
                })}
            </div>
        </div>
    );
};

export default ItemList;
