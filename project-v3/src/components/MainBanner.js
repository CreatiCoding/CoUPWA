import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/MainBanner.css";

const MainBannerInfo = ({ele}) => {
	return (
		<div className="main-banner-swiper-slide">
			<img
				className="main-banner-img"
				onError={e => {
					e.target.src = "/images/banner_naver.png";
				}}
				src={ele.banner_image_path}
			/>
		</div>
	);
};
const MainBanner = ({
	viewBannerImage
	//,some
}) => {
	const mapToMainBannerInfo = data => {
		return data.map((ele, i, arr) => {
			return <MainBannerInfo key={i} ele={ele} />;
		});
	};
	let settings = {
		dots: true,
		lazyLoad: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dotsClass: "main-banner-slick-dots slick-dots"
	};
	return (
		<div className="main-banner-swiper-container">
			<Slider {...settings}>
				{mapToMainBannerInfo(viewBannerImage)}
			</Slider>
		</div>
	);
};

export default MainBanner;
