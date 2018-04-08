import React from "react";
import "../css/MainHeaderNav.css";
import {Link} from "react-router-dom";

const MainHeaderNav = ({}) => {
	const naver_icon = "/images/naver_icon_144.png";
	const naver = "https://m.naver.com";

	return (
		<div className="wrapper-width main-header-nav">
			<a href={naver}>
				<img className="img-test" src={naver_icon} alt={"naver-icon"} />
			</a>
			<h1 className="header-nav-font default-font-bold">
				<Link to="/">
					<span>프로그레시브 웹툰</span>
				</Link>
			</h1>
		</div>
	);
};

export default MainHeaderNav;
