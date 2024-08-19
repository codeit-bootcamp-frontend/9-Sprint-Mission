import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { getProducts } from "../../../api/itemApi";

const getPageSize = () => {
	const width = window.innerWidth;
	if (width < 768) {
		return 1;
	} else if (width < 1280) {
		return 2;
	} else {
		return 4;
	}
};
//이 부분은 더 효율적으로 묶어줄 수 있지 않을지 고민중

function BestItemsSection() {
	const [itemList, setItemList] = useState([]);
	const [pageSize, setPageSize] = useState(getPageSize());

	const fetchSortedData = async ({ orderBy, pageSize }) => {
		const products = await getProducts({ orderBy, pageSize });
		setItemList(products.list);
	};

	useEffect(() => {
		const handleResize = () => {
			setPageSize(getPageSize());
		};

		window.addEventListener("resize", handleResize);
		fetchSortedData({ orderBy: "favorite", pageSize });

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [pageSize]);

	return (
		<div className="bestItemsContainer">
			<h1 className="sectionTitle">베스트 상품</h1>

			<div className="bestItemsCardSection">
				{itemList?.map((item) => (
					<ItemCard item={item} key={`best-item-${item.id}`} />
				))}
			</div>
		</div>
	);
}

export default BestItemsSection;