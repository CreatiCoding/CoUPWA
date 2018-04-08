import React, {Component} from "react";
import MainBanner from "../components/MainBanner";
import {connect} from "react-redux";

class MainBannerContainer extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const bannerList = [
			"/bannerImage?num=0",
			"/bannerImage?num=1",
			"/bannerImage?num=2",
			"/bannerImage?num=3",
			"/bannerImage?num=4",
			"/bannerImage?num=5"
		];
		return <MainBanner bannerList={bannerList} />;
	}
}

export default MainBannerContainer;
