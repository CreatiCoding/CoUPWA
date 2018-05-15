import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/MainContents.css";
import {Link} from "react-router-dom";

const MainContents = ({viewToon}) => {
	let initSlide = new Date().getDay() == 0 ? 6 : new Date().getDay() - 1;
	let settings = {
		// 0이면 일요일인데 일요일 슬라이드는 6임 나머진-1만 해주면됨
		initialSlide: initSlide, //currentWeekNum,
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		lazyLoad: true,
		arrows: false,
		className: "main-contents-slick",
		dotsClass: "main-contents-slick-dots slick-dots",
		customPaging: function(i) {
			let dow = ["월", "화", "수", "목", "금", "토", "일"];
			return <a>{dow[i]}</a>;
		}
	};

	const mapToMainContentsWebtoon = data => {
		return data.map((ele, seq) => {
			let isMouseDown = false;
			let isLinkable = true;
			return (
				<Link
					key={seq}
					to={"/list/" + ele.toon_info_idx}
					onMouseMove={() => {
						if (isMouseDown) {
							isLinkable = false;
						}
					}}
					onMouseDown={() => {
						isMouseDown = true;
					}}
					onMouseUp={() => {
						isMouseDown = false;
					}}
					onClick={e => {
						if (!isLinkable) {
							isLinkable = true;
							e.preventDefault();
						}
					}}
				>
					<div className="main-contents-toon col-xl-2 col-lg-2 col-md-2 col-sm-3 col-4">
						<div className="main-contents-toon-img">
							<img
								className="main-contents-toon-thumbnail"
								src={ele.image_path}
							/>
							<img
								className="default-thumbnail"
								src={"/images/thumbnail_default.png"}
							/>
						</div>
						<div className="main-contents-toon-info">
							<div className="main-contents-toon-title">
								{ele.toon_info_name}
							</div>
							<div className="main-contents-toon-middle">
								<div className="main-contents-toon-star">
									{ele.toon_info_star}
								</div>
								<div>&nbsp;</div>
								<div className="main-contents-toon-update">
									{ele.toon_info_update.toString()}
								</div>
							</div>
							<div className="main-contents-toon-author">
								{ele.toon_info_author}
							</div>
						</div>
					</div>
				</Link>
			);
		});
	};

	const mapToSlideToMainContents = viewToon => {
		return viewToon.map((ele, seq) => {
			return (
				<div className="container" key={seq}>
					<div className="row">{mapToMainContentsWebtoon(ele)}</div>
				</div>
			);
		});
	};
	return <Slider {...settings}>{mapToSlideToMainContents(viewToon)}</Slider>;
};

export default MainContents;
