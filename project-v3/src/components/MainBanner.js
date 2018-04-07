import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainBannerInfo = ({ src, alt }) => {
	const errfunc = e => {
		e.target.src = '/images/banner_naver.png';
	};
	return (
		<div className="main-banner-swiper-slide swiper-slide">
			<img className="main-banner-img" onError={errfunc} src={src} />
		</div>
	);
};
const MainBanner = ({ srcList }) => {
	const mapToMainBannerInfo = data => {
		return data.map((src, i, arr) => {
			return <MainBannerInfo src={src} key={i} />;
		});
	};
	let settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};
	return (
		<div className="main-banner-swiper-container swiper-container">
			<div className="main-banner-swiper-wrapper swiper-wrapper">
				<Slider {...settings}>
					{mapToMainBannerInfo(srcList)}
				</Slider>
			</div>
		</div>
	);
};

export default MainBanner;
