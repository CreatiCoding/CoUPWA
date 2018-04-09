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
/*
			<Wrapper />
			<MainMenu />
			<Link to="/list">리스트 페이지</Link>
			<Link to="/detail">상세 페이지</Link>

			<Wrapper />
* */
