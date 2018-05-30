import React from "react";
import "../css/ListHeader.css";

const updateStyle = "list-contents-toon-update";
const noUpdateStyle = "list-contents-toon-update hide";

const ListContents = ({items, toonInfo, toon_info_idx}) => {
	const mapToListContentsWebtoonList = data => {
		if (data.length === 1 && data[0] === undefined) {
			alert(
				"19금 웹툰은 네이버웹툰에서 이용해주세요! :)" +
					JSON.stringify(toonInfo)
			);
			window.location =
				"http://comic.naver.com/webtoon/list.nhn?titleId=" +
				toon_info_idx;
		}
		return data.map((ele, seq) => {
			let href =
				"http://m.comic.naver.com/webtoon/detail.nhn?titleId=" +
				toonInfo.toon_info_idx +
				"&no=" +
				ele.toon_data_idx;
			let onclick = e => {
				e.preventDefault();
				window.location.href = href;
			};
			let altDefault = "기본 썸네일";
			return (
				<li
					onClick={onclick}
					key={seq}
					className="sub_toon_lst"
					alt={ele.toon_data_name}
				>
					<div className="list-toon-img">
						<img
							className="default-thumbnail"
							src={"/images/list_logo.jpg"}
							alt={altDefault}
						/>
						<img
							className="square"
							src={
								"https://us-central1-react-pwa-webtoon.cloudfunctions.net/requestImage/images?url=" +
								ele.toon_data_thumb
							}
							onError={e => {
								e.target.src = "/images/list_logo.jpg";
							}}
						/>
					</div>
					<div className="toon_info" key={ele.toon_data_idx}>
						<div className="toon-data-title">
							{ele.toon_data_idx + " " + ele.toon_data_name}
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
