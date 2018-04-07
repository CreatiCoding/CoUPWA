import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import $ from 'jquery';

const ListTypeInfo = ({ ListType, clickTypes, seq }) => {
	return (
		<MenuItem
			eventKey={seq}
			onClick={(e) => {
				clickTypes(seq);
				$(".dropdown button").click();
			}}
		>
			<div className={'main-hedaer-dropdown-menu-item'}>
				{ListType}
			</div>
		</MenuItem>
	);
};

const MainHeader = ({ clickLeft, clickRight, clickTypes, curListType }) => {
	const listTypes = ['조 회 순', '업데이트순', '별 점 순', '제 목 순'];
	curListType = curListType === undefined ? 0 : curListType;
	const mapToListType = data => {
		return data.map((ele, seq) => {
			return (
				<ListTypeInfo
					key={seq}
					seq={seq}
					ListType={ele}
					clickTypes={n => {
						clickTypes(n);
					}}
				/>
			);
		});
	};
	return (
		<div className="main-header-navbar">
			<div className="main-header-side-style oi oi-caret-left" onClick={clickLeft} />
			<div className="main-header-list-type-style">
				<DropdownButton
					noCaret
					id="main-haeder-dropdown"
					bsStyle="default"
					title={listTypes[curListType]}
					className="default-font">
					{mapToListType(listTypes)}
				</DropdownButton>
			</div>
			<div className="main-header-side-style oi oi-caret-right" onClick={clickRight} />
		</div>
	);
};

export default MainHeader;
