import React from "react";
import MainMenu from "../components/MainMenu";
import ListHeaderContainer from "../containers/ListHeaderContainer";
import ListContentsContainer from "../containers/ListContentsContainer";

const ListRoute = ({match}) => {
	return (
		<div className="main-route">
			<ListHeaderContainer toon_info_idx={match.params.toon_info_idx} />
			<ListContentsContainer toon_info_idx={match.params.toon_info_idx} />
			<MainMenu />
		</div>
	);
};

export default ListRoute;
