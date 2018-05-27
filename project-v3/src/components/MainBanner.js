import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/MainBanner.css";
import {Link} from "react-router-dom";

const MainBannerInfo = ({ele}) => {
	// let loadImgBackground = e => {
	// 	setTimeout(
	// 		ele => {
	// 			ele.attributes.src.value = ele.attributes.path.value;
	// 		},
	// 		10,
	// 		e.target
	// 	);
	// };

	let isMouseDown = false;
	let isLinkable = true;
	return (
		<Link
			to={ele.banner_image_href}
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
			<div className="main-banner-swiper-slide">
				<img
					className="main-banner-img"
					onError={e => {
						e.target.src = "/images/banner_naver.jpg";
					}}
					src={ele.banner_image_path}
					// src={"/images/banner_naver.png"}
					// onLoad={loadImgBackground}
					// path={ele.banner_image_path}
					alt={ele.image_alt}
				/>
			</div>
		</Link>
	);
};
//ele.banner_image_path
const MainBanner = ({viewBannerImage}) => {
	const mapToMainBannerInfo = data => {
		return data.map((ele, i) => {
			return <MainBannerInfo key={i} ele={ele} />;
		});
	};
	let settings = {
		dots: true,
		lazyLoad: "ondemand",
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
				{mapToMainBannerInfo(viewBannerImage.slice(0, 8))}
			</Slider>
		</div>
	);
};

export default MainBanner;
