import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/ListHeader.css";
import InfiniteScroll from "react-infinite-scroller";

const ListContents = ({items, toonInfo}) => {
	console.log(items);

	const mapToListContentsWebtoonList = data => {
		return data.map((ele, seq) => {
			let updateStyle = "list-contents-toon-update";
			let noUpdateStyle = "list-contents-toon-update hide";
			return (
				<li key={seq} className="sub_toon_lst">
					<img className="square" src={ele.toon_data_thumb} />
					<div className="toon_info" key={ele.toon_data_idx}>
						<div className="toon-data-title">
							{ele.toon_data_name}
							<div
								className={
									ele.toon_data_update
										? updateStyle
										: noUpdateStyle
								}
							>
								{ele.toon_data_update ? "UP" : ""}
							</div>
						</div>
						<div className="sub-toon-title">
							<div className="list-contents-toon-star-date">
								<div className="list-contents-toon-star">
									✭{ele.toon_data_star}
								</div>{" "}
								<div className="list-contents-toon-date">
									{ele.toon_data_update_at}
								</div>
							</div>
						</div>
					</div>
				</li>
			);
		});
	};
	return <ul className="toon_lst">{mapToListContentsWebtoonList(items)}</ul>;
};

export default ListContents;
