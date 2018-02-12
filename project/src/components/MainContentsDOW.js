import React from 'react';
import '../css/mainContentsDOW.css'
import '../css/bootstrap.min.css'
const MainContentsDOW = ({})=> {
		return (
			<div className="main-contents-dow container-fluid" >
				<div className="row main-contents-dow-row">
					<div className="main-contents-dow-btn col col-sm col-md col-lg col-xl">
						월
					</div>
					<div className="main-contents-dow-btn col col-sm col-md col-lg col-xl">
						화
					</div>
					<div className="main-contents-dow-btn col col-sm col-md col-lg col-xl">
						수
					</div>
					<div className="main-contents-dow-btn col col-sm col-md col-lg col-xl">
						목
					</div>
					<div className="main-contents-dow-btn col col-sm col-md col-lg col-xl">
						금
					</div>
					<div className="main-contents-dow-btn col col-sm col-md col-lg col-xl">
						토
					</div>
					<div className="main-contents-dow-btn col col-sm col-md col-lg col-xl">
						일
					</div>
				</div>
			</div>
		);
}

export default MainContentsDOW;
