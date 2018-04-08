import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/MainBanner.css";

const MainBannerInfo = ({src, alt}) => {
	const errfunc = e => {
		e.target.src = "/images/banner_naver.png";
	};
	return (
		<div className="main-banner-swiper-slide">
			<img
				className="main-banner-img"
				onError={errfunc}
				src={src}
				alt={alt}
			/>
		</div>
	);
};
const MainBanner = ({bannerList}) => {
	const mapToMainBannerInfo = data => {
		return data.map((src, i, arr) => {
			return (
				<MainBannerInfo src={src} key={i} alt={"banner-image-" + i} />
			);
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
			<Slider {...settings}>{mapToMainBannerInfo(bannerList)}</Slider>
		</div>
	);
};

export default MainBanner;
