import React from "react";
import MainMenu from "../components/MainMenu";
import ListHeaderContainer from "../containers/ListHeaderContainer";
import ListContentsContainer from "../containers/ListContentsContainer";

const ListRoute = ({match}) => {
	console.log(match.params.toon_info_idx);
	if (match.params.toon_info_idx === undefined) {
		alert("잘못된 경로로 들어오셨습니다 :)\n사용에 맞게 사용해주세요! :)");
		window.location = "/";
	}
	//if(match.params.toon_info_idx)
	return (
		<div className="main-route">
			<ListHeaderContainer toon_info_idx={match.params.toon_info_idx} />
			<ListContentsContainer toon_info_idx={match.params.toon_info_idx} />
			<MainMenu />
		</div>
	);
};

export default ListRoute;
