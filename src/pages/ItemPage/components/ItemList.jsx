import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import searchIcon from "../../../assets/icon/search.svg";
import { getProduct } from "../../../utils/api/api";

const getWindowSize = () => {
    const width = window.innerWidth;

    if (width < 767) {
        return 4;
    } else if (width < 1200) {
        return 6;
    } else {
        return 10;
    }
};

const ItemList = () => {
    const [product, setProduct] = useState([]);
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState("recent");
    const [pageSize, setPageSize] = useState(getWindowSize());

    const handleOrderChange = (e) => {
        setOrder(e.target.value);
    };

    const productLoad = async (options) => {
        let result = await getProduct(options);
        if (!result) return;
        setProduct(result.list);
    };

    useEffect(() => {
        productLoad({ page, pageSize: pageSize, orderBy: order });
    }, [page, pageSize, order]);

    useEffect(() => {
        const handleResize = () => {
            setPageSize(getWindowSize());
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="itemList">
            <div className="topNav">
                <h2>전체 상품</h2>
                {pageSize === 4 && <Link to={"/additem"}>상품 등록하기</Link>}
                <div className="topNavRigth">
                    <input placeholder="검색할 상품을 입력해주세요" />
                    <img
                        className="searchIcon"
                        src={searchIcon}
                        alt="검색 아이콘"
                    />
                    {pageSize === 4 || (
                        <Link to={"/additem"}>상품 등록하기</Link>
                    )}
                    <select onChange={handleOrderChange} defaultValue="recent">
                        <option value="recent">최신순</option>
                        <option value="favorite">좋아요순</option>
                    </select>
                </div>
            </div>
            <div className="items">
                {product.map((item) => {
                    return <ProductItem key={item.id} item={item} />;
                })}
            </div>
        </div>
    );
};

export default ItemList;
