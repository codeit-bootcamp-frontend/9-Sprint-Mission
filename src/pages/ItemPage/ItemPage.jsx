import React from "react";
import BestItemList from "./components/BestItemList";
import ItemList from "./components/ItemList";
import "./ItemPage.css";

const ItemPage = () => {
    return (
        <div className="container">
            <BestItemList />
            <ItemList />
        </div>
    );
};

export default ItemPage;
