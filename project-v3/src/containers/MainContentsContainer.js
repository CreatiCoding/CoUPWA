import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions";
import MainContents from "../components/MainContents";
import coupwaFetch from "../lib/coupwaFetch";
import db from "../lib/db";

class MainContentsContainer extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		coupwaFetch.fetchViewToon("ViewCount").then(r => {
			this.props.handleChangeViewToon(r);
		});
	}
	render() {
		return (
			<div>
				<MainContents viewToon={this.props.viewToon} />
			</div>
		);
	}
}

const mapStateToPrpos = state => {
	return {
		viewToon: state.mainContentsReducer.viewToon
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleChangeViewToon: viewToon => {
			dispatch(actions.changeViewToon(viewToon));
		}
	};
};
export default connect(mapStateToPrpos, mapDispatchToProps)(
	MainContentsContainer
);
