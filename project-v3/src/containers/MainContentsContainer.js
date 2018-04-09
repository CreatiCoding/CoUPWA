import React, {Component} from "react";
import {connect} from "react-redux";
// import * as actions from "../actions";
import MainContents from "../components/MainContents";

class MainContentsContainer extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {}

	render() {
		return (
			<div>
				<MainContents />
			</div>
		);
	}
}

const mapStateToPrpos = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {};
};

export default connect(mapStateToPrpos, mapDispatchToProps)(
	MainContentsContainer
);
