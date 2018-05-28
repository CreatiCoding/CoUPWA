import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/MainContents.css";
import $ from "jquery";
import {Link} from "react-router-dom";

const MainContents = ({viewToon}) => {
	let lazyLoadImage = n => {};
	let initSlide = new Date().getDay() == 0 ? 6 : new Date().getDay() - 1;
	let settings = {
		// 0이면 일요일인데 일요일 슬라이드는 6임 나머진-1만 해주면됨
		initialSlide: initSlide, //currentWeekNum,
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		lazyLoad: "ondemand",
		arrows: false,
		className: "main-contents-slick",
		dotsClass: "main-contents-slick-dots slick-dots",
		customPaging: function(i) {
			let dow = ["월", "화", "수", "목", "금", "토", "일"];
			return <a>{dow[i]}</a>;
		},
		afterChange: function(slide, slide2) {
			var a = $(".main-contents-slick .slick-track").children();
			let n = slide;
			console.log(slide, slide2);
			if (n == 0) {
				$(a[1].childNodes[0])
					.find("img.main-contents-toon-thumbnail")
					.hide();
			} else if (n == 1) {
				$(a[0].childNodes[0])
					.find("img.main-contents-toon-thumbnail")
					.hide();
				$(a[2].childNodes[0])
					.find("img.main-contents-toon-thumbnail")
					.hide();
			} else if (n == 2) {
				$(a[1].childNodes[0])
					.find("img.main-contents-toon-thumbnail")
					.hide();
				$(a[3].childNodes[0])
					.find("img.main-contents-toon-thumbnail")
					.hide();
			} else if (n == 3) {
				$(a[2].childNodes[0])
					.find("img.main-contents-toon-thumbnail")
					.hide();
				$(a[4].childNodes[0])
					.find("img.main-contents-toon-thumbnail")
					.hide();
			} else if (n == 4) {
				$(a[3].childNodes[0])
					.find("img.main-contents-toon-thumbnail")
					.hide();
				$(a[5].childNodes[0])
					.find("img.main-contents-toon-thumbnail")
					.hide();
			} else if (n == 5) {
				$(a[6].childNodes[0])
					.find("img.main-contents-toon-thumbnail")
					.hide();
				$(a[4].childNodes[0])
					.find("img.main-contents-toon-thumbnail")
					.hide();
			} else if (n == 6) {
				$(a[5].childNodes[0])
					.find("img.main-contents-toon-thumbnail")
					.hide();
			}
		},
		beforeChange: function(slide2, slide) {
			var a = $(".main-contents-slick .slick-track").children();
			let n = slide;
			console.log(slide, slide2);
			if (n == 0) {
				$(a[0].childNodes[0]).show();
				$(a[0].childNodes[0])
					.find("img.main-contents-toon-thumbnail")
					.show();
				$(a[1].childNodes[0]).show();
				$(a[2].childNodes[0]).hide();
			} else if (n == 1) {
				$(a[1].childNodes[0]).show();
				$(a[1].childNodes[0])
					.find("img.main-contents-toon-thumbnail")
					.show();
				$(a[0].childNodes[0]).show();
				$(a[2].childNodes[0]).show();
				$(a[3].childNodes[0]).hide();
			} else if (n == 2) {
				$(a[2].childNodes[0]).show();
				$(a[2].childNodes[0])
					.find("img.main-contents-toon-thumbnail")
					.show();
				$(a[0].childNodes[0]).hide();
				$(a[4].childNodes[0]).hide();
				$(a[1].childNodes[0]).show();
				$(a[3].childNodes[0]).show();
				$(a[3].childNodes[0])
					.find("img.main-contents-toon-thumbnail")
					.hide();
			} else if (n == 3) {
				$(a[3].childNodes[0]).show();
				$(a[3].childNodes[0])
					.find("img.main-contents-toon-thumbnail")
					.show();
				$(a[1].childNodes[0]).hide();
				$(a[5].childNodes[0]).hide();
				$(a[2].childNodes[0]).show();
				$(a[4].childNodes[0]).show();
			} else if (n == 4) {
				$(a[4].childNodes[0]).show();
				$(a[4].childNodes[0])
					.find("img.main-contents-toon-thumbnail")
					.show();
				$(a[2].childNodes[0]).hide();
				$(a[6].childNodes[0]).hide();
				$(a[3].childNodes[0]).show();
				$(a[5].childNodes[0]).show();
			} else if (n == 5) {
				$(a[5].childNodes[0]).show();
				$(a[5].childNodes[0])
					.find("img.main-contents-toon-thumbnail")
					.show();
				$(a[6].childNodes[0]).show();
				$(a[4].childNodes[0]).show();
				$(a[3].childNodes[0]).hide();
			} else if (n == 6) {
				$(a[6].childNodes[0]).show();
				$(a[6].childNodes[0])
					.find("img.main-contents-toon-thumbnail")
					.show();
				$(a[5].childNodes[0]).show();
				$(a[4].childNodes[0]).hide();
			}
		}
	};

	const mapToMainContentsWebtoon = data => {
		let loadImgBackground = (e, path) => {
			setTimeout(
				ele => {
					if (window.navigator.userAgent.indexOf("Chrome") == -1)
						path = path.slice(0, path.lastIndexOf(".")) + ".jpg";
					ele.attributes.src.value = path;
				},
				0,
				e.target
			);
		};
		return data.map((ele, seq) => {
			let isMouseDown = false;
			let isLinkable = true;
			let updateStyle = "main-contents-toon-update";
			let noUpdateStyle = "main-contents-toon-update hide";
			let altDefault = "기본 썸네일 이미지";
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
								href={"/list/" + ele.toon_info_idx}
								className="main-contents-toon-thumbnail"
								src={ele.image_path}
								onLoad={e => {
									loadImgBackground(e, ele.image_path);
								}}
								path={ele.image_path}
								alt={ele.image_alt}
								onError={e => {
									e.target.src =
										"/images/thumbnail_default.png";
								}}
							/>
							<img
								href={"/list/" + ele.toon_info_idx}
								className="default-thumbnail"
								src={"/images/thumbnail_default.png"}
								alt={altDefault}
							/>
						</div>
						<div className="main-contents-toon-info">
							<div className="main-contents-toon-title">
								{ele.toon_info_name}
							</div>
							<div className="main-contents-toon-middle">
								<div className="main-contents-toon-star">
									✭{ele.toon_info_star}
								</div>
								<div>&nbsp;</div>
								<div
									className={
										ele.toon_info_update
											? updateStyle
											: noUpdateStyle
									}
								>
									{ele.toon_info_update ? "UP" : ""}
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
