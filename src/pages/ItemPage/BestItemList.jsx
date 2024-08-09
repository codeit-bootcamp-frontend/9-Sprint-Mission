import React from "react";
import ProductItem from "./ProductItem";

const BestItemList = ({ item, windowSize }) => {
    return (
        <div className="itemList">
            <div className="topNav">
                <h2>베스트 상품</h2>
            </div>
            <div className="bestItems">
                {item.slice(0, windowSize).map((item) => {
                    return <ProductItem key={item.id} item={item} />;
                })}
            </div>
        </div>
    );
};

export default BestItemList;
