import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { getProducts } from "../../../utils/api/api";
import { getPageSize } from "../../../utils/functions/getPageSize";

const BestItemList = () => {
    const [product, setProduct] = useState([]);
    const [pageSize, setPageSize] = useState(getPageSize());

    const productLoad = async (options) => {
        let result = await getProducts(options);
        if (!result) return;
        setProduct(result.list);
    };

    useEffect(() => {
        productLoad({ page: 1, pageSize, orderBy: "favorite" });
    }, [pageSize]);

    useEffect(() => {
        const handleResize = () => {
            setPageSize(getPageSize());
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
