import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/ListHeader.css";
import InfiniteScroll from "react-infinite-scroller";

const ListContents = ({items}) => {
	console.log(items);
	const mapToListContentsWebtoonList = data => {
		return data.map((ele, seq) => {
			return (
				<li key={seq} className="sub_toon_lst">
					<a href="#" target="_blank">
						<img className="square" src={ele.toon_data_thumb} />
						<div className="toon_info" key={ele.toon_data_idx}>
							<div className="toon-title">
								{ele.toon_data_name}
							</div>
							<div className="sub-toon-title">
								<span>별점 {ele.toon_data_star}</span>
								<span>{ele.toon_data_update_at}</span>
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
