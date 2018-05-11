import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/ListHeader.css";
import InfiniteScroll from "react-infinite-scroller";

const ListContents = ({items}) => {
	const mapToListContentsWebtoonList = data => {
		return data.map((ele, seq) => {
			return (
				<li key={seq} className="sub_toon_lst">
					<a href="#" target="_blank">
						<img
							className="square"
							src="https://8share-production-my.s3.amazonaws.com/campaigns/4898/photos/profile/thumb_copy.png?1397732185"
						/>
						<div className="toon_info">
							<div className="toon-title">1화 웹툰입니다.</div>
							<div className="sub-toon-title">
								<span>별점 9.5</span>
								<span>18.03.06</span>
							</div>
						</div>
					</a>
				</li>
			);
		});
	};
	return <ul className="toon_lst">{mapToListContentsWebtoonList(items)}</ul>;
};

export default ListContents;
