import React from 'react';
import '../css/mainMenu.css'

const MainMenu = ({})=> {

		return (
			<div className="main-menu container-fluid" >
				<div className="row main-menu-row">
					<div className="main-menu-btn col col-sm col-md col-lg col-xl"
						 onClick={()=>{window.location.href = ("/");}}>
						<div className=" oi oi-calendar main-menu-icon" />
							<div className="main-menu-btn-text-contents">웹툰</div>
					</div>
					<div className="main-menu-btn col col-sm col-md col-lg col-xl"
						 onClick={()=>{window.location.href = ("http://m.novel.naver.com/webnovel/weekday.nhn");}}>
						<div className=" oi oi-book main-menu-icon" />
							<div className="main-menu-btn-text-contents">웹소설</div>
					</div>
					<div className="main-menu-btn col col-sm col-md col-lg col-xl"
						 onClick={()=>{window.location.href = ("http://m.comic.naver.com/store/comic/index.nhn");}}>
						<div className=" oi oi-plus main-menu-icon" />
							<div className="main-menu-btn-text-contents">웹툰<br/>플러스</div>
					</div>
					<div className="main-menu-btn col col-sm col-md col-lg col-xl"
						 onClick={()=>{window.location.href = ("http://m.comic.naver.com/bestChallenge/genre.nhn");}}>
						<div className=" oi oi-badge main-menu-icon" />
							<div className="main-menu-btn-text-contents">베스트<br/>도전</div>
					</div>
					<div className="main-menu-btn col col-sm col-md col-lg col-xl" onClick={()=>{alert('마이페이지');}}>
						<div className=" oi oi-person main-menu-icon" />
							<div className="main-menu-btn-text-contents">MY</div>
					</div>
				</div>
			</div>
		);
}

export default MainMenu;
