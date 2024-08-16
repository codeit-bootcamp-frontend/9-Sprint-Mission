import React from "react";
import "./PaginationBar.css";
import { ReactComponent as LeftArrow } from "../../assets/icons/arrow_left.svg";
import { ReactComponent as RightArrow } from "../../assets/icons/arrow_right.svg";

const PaginationBar = ({ totalPageNum, currentPageNum, onPageChange }) => {
	const maxVisiblePages = 5; //최대한 보여줄 수 있는 페이지 수
	let startPage; //시작 페이지 변수

	if (totalPageNum <= maxVisiblePages) {
		startPage = 1;
		//만약 전체 페이지 수가 최대보여지는 페이지 수보다 작으면 시작페이지를 1로 설정하고 
		//별다른 설정값 없이 1부터 모두 나열해서 보여준다
	} else {
		startPage = Math.max(currentPageNum - Math.floor(maxVisiblePages / 2), 1);
		startPage = Math.min(startPage, totalPageNum - maxVisiblePages + 1);
	}
		//전체 페이지 수가 더 많다면, 2가지 설정을 해줘야 한다.
		//첫번째는 페이지 버튼 5개가 있다면 사용자가 보는 현페이지가 가운데 버튼에 오도록 하는 설정
		//두번째는 1~5페이지를 다음 6~10페이지로 넘길때, 시작페이지가 5부터 시작하는 것을 방지하거나
		//5~9페이지 이런식으로 나타나는 것을 방지하기 위한 설정

	const pages = Array.from( //주어진 길이랑, 내용을 가진 새로운 배열을 생성
		{ length: Math.min(maxVisiblePages, totalPageNum - startPage + 1) },
		//길이
		//최대페이지수보다 현재페이지~마지막페이지까지 수를 계산해서 적은 값만큼 배열생성
		//예 : 16~18까지 남았으면 5개 페이지 버튼생성이 아니라, 3개 버튼만 생성
		(_, i) => startPage + i
		//내용
		//위에서 나온 배열값에서 현재페이지를 기준으로 인덱스 번호만큼 값을 더해서 반환
	);

	return (
		//왼쪽 화살표 버튼
		<div className="paginationBar">
			<button
				className="paginationButton"
				disabled={currentPageNum === 1} 
				onClick={() => onPageChange(currentPageNum - 1)}
			>
				<LeftArrow />
			</button>

		{/* 페이지 버튼 */}
			{pages.map((page) => (
				<button 
					key={page}
					className={`paginationButton ${
						currentPageNum === page ? "active" : ""
					}`}
					//클래스네임을 이렇게 지정하는 이유: 각 페이지 버튼마다 css를 적용해주기 위함
					//만약 현재페이지가 버튼의 page번호와 일치하면 활성화시켜주는 css를 적용할 예정
					onClick={() => onPageChange(page)}
				>
					{page}
				</button>
			))}

		{/* 오른쪽 화살표 버튼 */}
			<button
				className="paginationButton"
				disabled={currentPageNum === totalPageNum}
				onClick={() => onPageChange(currentPageNum + 1)}
			>
				<RightArrow />
			</button>
		</div>
	);
};


export default PaginationBar;
