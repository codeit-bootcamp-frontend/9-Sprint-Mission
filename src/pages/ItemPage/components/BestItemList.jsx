import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { getProduct } from "../../../utils/api/api";

const getWindowSize = () => {
    const width = window.innerWidth;

    if (width < 767) {
        return 1;
    } else if (width < 1200) {
        return 2;
    } else {
        return 4;
    }
};

const BestItemList = () => {
    const [product, setProduct] = useState([]);
    const [pageSize, setPageSize] = useState(getWindowSize());

    const productLoad = async (options) => {
        let result = await getProduct(options);
        if (!result) return;
        setProduct(result.list);
    };

    useEffect(() => {
        productLoad({ page: 1, pageSize: pageSize, orderBy: "favorite" });
    }, [pageSize]);

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
                <h2>베스트 상품</h2>
            </div>
            <div className="bestItems">
                {product.map((item) => {
                    return <ProductItem key={item.id} item={item} />;
                })}
            </div>
        </div>
    );
};

export default BestItemList;
