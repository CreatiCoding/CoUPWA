import React from "react";
import {DropdownButton, MenuItem} from "react-bootstrap";
import $ from "jquery";
import "../css/MainHeader.css";

const ListTypeInfo = ({SortType, clickTypes, seq}) => {
	return (
		<MenuItem
			eventKey={seq}
			onClick={e => {
				clickTypes(seq);
				$(".dropdown button").click();
			}}
		>
			<div className={"main-header-dropdown-menu-item"}>{SortType}</div>
		</MenuItem>
	);
};
const MainHeader = ({currentSortType, clickLeft, clickRight, clickTypes}) => {
	let sortTypesKor = {
		ViewCount: "조회순",
		Update: "업데이트순",
		StarScore: "별점순",
		TitleName: "제목순"
	};
	currentSortType =
		currentSortType === undefined
			? sortTypesKor["ViewCount"]
			: sortTypesKor[currentSortType];
	const mapToListType = data => {
		return Object.keys(data).map(function(key, index) {
			return (
				<ListTypeInfo
					SortType={data[key]}
					clickTypes={n => {
						clickTypes(n);
					}}
					seq={index}
					key={index}
				/>
			);
		});
	};
	return (
		<div className="main-header-navbar hide">
			<div
				className="main-header-side-style oi oi-caret-left"
				onClick={clickLeft}
			/>
			<div className="main-header-list-type-style">
				<DropdownButton
					id="main-header-dropdown"
					bsStyle="default"
					title={currentSortType}
					className="default-font dropdown-toggle-no-caret"
				>
					{mapToListType(sortTypesKor)}
				</DropdownButton>
			</div>
			<div
				className="main-header-side-style oi oi-caret-right"
				onClick={clickRight}
			/>
		</div>
	);
};

export default MainHeader;
