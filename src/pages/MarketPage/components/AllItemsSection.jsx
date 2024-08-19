import React, { useEffect, useState } from "react";
import { getProducts } from "../../../api/itemApi";
import { ReactComponent as SortIcon } from "../../../assets/icons/ic_sort.svg";
import { ReactComponent as SearchIcon } from "../../../assets/icons/ic_search.svg";
import { Link } from "react-router-dom";
import DropdownList from "../../../components/UI/DropdownList";
import PaginationBar from "../../../components/UI/PaginationBar"; 
import ItemCard from "./ItemCard";

const getPageSize = () => {
	const width = window.innerWidth;
	if (width < 768) {
		return 4;
		//모바일
	} else if (width < 1280) {
		return 6;
		//태블릿
	} else {
		return 10;
		//데탑
	}
};

function AllItemsSection() {
	const [orderBy, setOrderBy] = useState("recent");
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(getPageSize());
	const [itemList, setItemList] = useState([]);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [totalPageNum, setTotalPageNum] = useState();
	//total페이지 초기값을 0이 아니라, 빈값으로 두는 이유는 0이라면 아예 초기에 불러오는 데이터가 없을 수도 있다
	//데이터가 아예 없는 것이 아니라, 정해지지 않은 것이기 때문에 빈값(또는 null)로 지정해두는것

	const fetchSortedData = async ({ orderBy, page, pageSize }) => {
		const products = await getProducts({ orderBy, page, pageSize });
		setItemList(products.list);
		setTotalPageNum(Math.ceil(products.totalCount / pageSize));
		//Math.ceil은 소숫점이 나오면 반올림해주는 메소드
		//products.totalCount는 API에서 가져온 전체 아이템 수
		//pageSize는 한 페이지에 표시되는 아이템 수
		//전체 페이지 수를 계산하려면 [전체 아이템 / 한 페이지에 표시되는 아이템] 해줘야 함
		//예 : 45개 아이템 / 10개 표시 아이템 = 4.5페이지 => 반올림(ceil) 해서 5페이지
	};

	const handleSortSelection = (sortOption) => {
		setOrderBy(sortOption);
		setIsDropdownVisible(false);
		//사용자가 정렬옵션을 최신순 혹은 인기순 중 하나를 선택하면 드롭다운을 숨겨주는 것
	};

	useEffect(() => {
		const handleResize = () => {
			setPageSize(getPageSize());
		};

		//화면 크기 변경할 때마다 pageSize를 다시 계산해 넣어줌
		window.addEventListener("resize", handleResize);
		fetchSortedData({ orderBy, page, pageSize });

		//클린 업 함수
		return () => {
			window.removeEventListener("resize", handleResize);
		};
		//불필요한 메모리 누수 방지, 이벤트 중복 방지
	}, [orderBy, page, pageSize]);

	const toggleDropdown = () => {
		setIsDropdownVisible(!isDropdownVisible);
	};
	//토글 버튼을 클릭하면 드롭다운 메뉴가 초기값 false > true로 되었다가
	//다시 클릭하면 true > false로 보였다가 사라졌다가 하는 기능

	const onPageChange = (pageNumber) => {
		setPage(pageNumber);
	};

	return (
		<div>
			<div className="allItemsSectionHeader">
				<h1 className="sectionTitle">판매 중인 상품</h1>
				<Link to="/additem" className="loginLink button">
					상품 등록하기
				</Link>
			</div>

			<div className="allItemsSectionHeader">
				<div className="searchBarWrapper">
					<SearchIcon />
					<input
						className="searchBarInput"
						placeholder="검색할 상품을 입력해 주세요"
					/>
				</div>
				<div className="sortButtonWrapper">
					<button
						className="sortDropdownTriggerButton"
						onClick={toggleDropdown}
					>
						<SortIcon />
					</button>
					{isDropdownVisible && (
						<DropdownList onSortSelection={handleSortSelection} />
					)}
				</div>
			</div>

			<div className="allItemsCardSection">
				{itemList?.map((item) => (
					<ItemCard item={item} key={`market-item-${item.id}`} />
				))}
			</div>

			<div className="paginationBarWrapper">
				<PaginationBar
					totalPageNum={totalPageNum}
					currentPageNum={page}
					onPageChange={onPageChange}
				/>
			</div>
		</div>
	);
}

export default AllItemsSection;