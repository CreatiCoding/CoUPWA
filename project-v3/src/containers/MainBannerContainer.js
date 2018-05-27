import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions";
import MainBanner from "../components/MainBanner";
import coupwaFetch from "../lib/coupwaFetch";

class MainBannerContainer extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		coupwaFetch.fetchViewBannerImageCaching().then(r => {
			this.props.handleChangeViewBannerImage(r);
		});
	}
	render() {
		return <MainBanner viewBannerImage={this.props.viewBannerImage} />;
	}
}

const mapStateToPrpos = state => {
	return {
		viewBannerImage: state.mainBannerReducer.viewBannerImage
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleChangeViewBannerImage: viewBannerImage => {
			dispatch(actions.changeViewBannerImage(viewBannerImage));
		}
	};
};
export default connect(mapStateToPrpos, mapDispatchToProps)(
	MainBannerContainer
);
