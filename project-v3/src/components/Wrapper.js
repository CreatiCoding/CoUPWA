import React from "react";
import MainContentsContainer from "../containers/MainContentsContainer";
import MainHeaderNav from "./MainHeaderNav";
import MainBannerContainer from "../containers/MainBannerContainer";
import "../css/Wrapper.css";

const Wrapper = () => {
	return (
		<div className="wrapper wrapper-width">
			<MainHeaderNav />
			<MainBannerContainer />
			<MainContentsContainer />
		</div>
	);
};

export default Wrapper;
