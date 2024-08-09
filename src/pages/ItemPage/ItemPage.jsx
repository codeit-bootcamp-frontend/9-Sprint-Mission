import React, { useCallback, useEffect, useState } from "react";
import BestItemList from "./BestItemList";
import ItemList from "./ItemList";
import "./ItemPage.css";
import { getProduct } from "../../api/api";
import PageButton from "./PageButton";

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

const ItemPage = () => {
    const [product, setProduct] = useState([]);
    const [bestProduct, setBestProduct] = useState([]);
    const [order, setOrder] = useState("recent");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [windowSize, setWindowSize] = useState(getWindowSize());

    const bestProductLoad = async (options) => {
        let result = await getProduct(options);
        if (!result) return;
        setBestProduct(result.list);
    };

    const productLoad = useCallback(async (options) => {
        let result = await getProduct(options);
        if (!result) return;
        setProduct(result.list);
    }, []);

    useEffect(() => {
        productLoad({ page, pageSize: 10, orderBy: order });
    }, [page, order, productLoad]);

    useEffect(() => {
        bestProductLoad({ page: 1, pageSize: 4, orderBy: "favorite" });
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(getWindowSize());
            setPageSize(getWindowSize() * 2 + 2);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="container">
            <BestItemList item={bestProduct} windowSize={windowSize} />
            <ItemList
                item={product}
                order={order}
                setOrder={setOrder}
                windowSize={pageSize}
            />
            <PageButton setPage={setPage} />
        </div>
    );
};

export default ItemPage;
