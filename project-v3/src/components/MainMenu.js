import React from "react";
import {Link} from "react-router-dom";
import "../css/MainMenu.css";
const MainMenu = ({}) => {
	return (
		<div className="main-menu-wrapper">
			<div className="main-menu container-fluid">
				<div className="row main-menu-row">
					<div className="main-menu-btn col col-sm col-md col-lg col-xl">
						<Link to="/">
							<img className="main-menu-btn-webtoon" />
						</Link>
					</div>
					<div className="main-menu-btn col col-sm col-md col-lg col-xl">
						<img
							className="main-menu-btn-web-book"
							onClick={() => {
								window.open(
									"http://m.novel.naver.com/webnovel/weekday.nhn",
									"_self"
								);
							}}
						/>
					</div>
					<div className="main-menu-btn col col-sm col-md col-lg col-xl">
						<img
							className="main-menu-btn-webtoon-plus"
							onClick={() => {
								window.open(
									"http://m.comic.naver.com/store/comic/index.nhn",
									"_self"
								);
							}}
						/>
					</div>
					<div className="main-menu-btn col col-sm col-md col-lg col-xl">
						<img
							className="main-menu-btn-best"
							onClick={() => {
								window.open(
									"http://m.comic.naver.com/bestChallenge/genre.nhn",
									"_self"
								);
							}}
						/>
					</div>
					<div className="main-menu-btn col col-sm col-md col-lg col-xl">
						<img
							className="main-menu-btn-my"
							onClick={() => {
								alert("마이페이지");
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainMenu;
