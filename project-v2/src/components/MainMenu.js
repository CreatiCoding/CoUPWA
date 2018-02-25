import React from 'react';

const MainMenu = ({})=> {
		return (
			<div className="main-menu container-fluid" >
				<div className="row main-menu-row">
					<div className="main-menu-btn col col-sm col-md col-lg col-xl"
						 onClick={()=>{window.location.href = ("/");}}>
						<img className="main-menu-btn-webtoon" />
					</div>
					<div className="main-menu-btn col col-sm col-md col-lg col-xl"
						 onClick={()=>{window.location.href = ("http://m.novel.naver.com/webnovel/weekday.nhn");}}>
						<img className="main-menu-btn-web-book" />
					</div>
					<div className="main-menu-btn col col-sm col-md col-lg col-xl"
						 onClick={()=>{window.location.href = ("http://m.comic.naver.com/store/comic/index.nhn");}}>
						<img className="main-menu-btn-webtoon-plus" />
					</div>
					<div className="main-menu-btn col col-sm col-md col-lg col-xl"
						 onClick={()=>{window.location.href = ("http://m.comic.naver.com/bestChallenge/genre.nhn");}}>
						<img className="main-menu-btn-best" />
					</div>
					<div className="main-menu-btn col col-sm col-md col-lg col-xl" onClick={()=>{alert('마이페이지');}}>
						<img className="main-menu-btn-my" />
					</div>
				</div>
			</div>
		);
}

export default MainMenu;
