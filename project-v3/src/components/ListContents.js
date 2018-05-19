import React from "react";
import "../css/ListHeader.css";

const ListContents = ({items, toonInfo}) => {
	const mapToListContentsWebtoonList = data => {
		return data.map((ele, seq) => {
			let href =
				"http://m.comic.naver.com/webtoon/detail.nhn?titleId=" +
				toonInfo.toon_info_idx +
				"&no=" +
				ele.toon_data_idx;
			let updateStyle = "list-contents-toon-update";
			let noUpdateStyle = "list-contents-toon-update hide";
			let onclick = e => {
				e.preventDefault();
				window.location.href = href;
			};
			return (
				<li onClick={onclick} key={seq} className="sub_toon_lst">
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
