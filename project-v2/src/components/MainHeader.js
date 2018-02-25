import React, { Component } from 'react';

const ListTypeInfo = ({ ListType, clickTypes, seq }) => {
    return (
        <li
            onClick={() => {
                clickTypes(seq);
            }}
        >
            <a className="dropdown-item default-font" value={seq}>
                {ListType}
            </a>
        </li>
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
        <div className="main-header-navbar pparent-style hide">
            <div className="parent-style">
                <div className="main-header-side-style oi oi-caret-left" onClick={clickLeft} />
                <div className="dropdown main-header-list-type-style">
                    <button className="btn default-font" data-toggle="dropdown">
                        {listTypes[curListType]}
                    </button>
                    <ul className="dropdown-menu main-hedaer-dropdown-menu">{mapToListType(listTypes)}</ul>
                </div>
                <div className="main-header-side-style oi oi-caret-right" onClick={clickRight} />
            </div>
        </div>
    );
};

export default MainHeader;
