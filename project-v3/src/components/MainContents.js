import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/MainContents.css";

const MainContents = ({}) => {
	let settings1 = {
		dots: true,
		lazyLoad: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false
		//dotsClass: "main-banner-slick-dots slick-dots"
	};
	let settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		className: "main-contents-slick",
		dotsClass: "main-contents-slick-dots slick-dots",
		customPaging: function(i) {
			let dow = ["월", "화", "수", "목", "금", "토", "일"];
			return <a>{dow[i]}</a>;
		}
	};
	return (
		<Slider {...settings}>
			<div>월요일 웹툰 페이지</div>
			<div>화요일 웹툰 페이지</div>
			<div>수요일 웹툰 페이지</div>
			<div>목요일 웹툰 페이지</div>
			<div>금요일 웹툰 페이지</div>
			<div>토요일 웹툰 페이지</div>
			<div>일요일 웹툰 페이지</div>
		</Slider>
	);
};

export default MainContents;
