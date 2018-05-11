import React from "react";
import Wrapper from "../components/Wrapper";
import MainMenu from "../components/MainMenu";
import MainHeaderContainer from "../containers/MainHeaderContainer";

const MainRoute = () => {
	return (
		<div className="main-route">
			<MainHeaderContainer />
			<Wrapper />
			<MainMenu />
		</div>
	);
};
export default MainRoute;
