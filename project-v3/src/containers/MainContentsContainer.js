import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions";
import MainContents from "../components/MainContents";
import coupwaFetch from "../lib/coupwaFetch";
import db from "../lib/db";
import commonUtil from "../lib/commonUtil";

class MainContentsContainer extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		coupwaFetch
			.fetchViewToon("ViewCount")
			.catch(() => {
				return db.getViewToon("180612", "ViewCount").then(r => {
					return r.data;
				});
			})
			.then(r => {
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
