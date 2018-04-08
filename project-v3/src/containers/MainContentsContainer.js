import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions";
import MainContents from "../components/MainContents";

class MainContentsContainer extends Component {
	constructor(props) {
		super(props);
		//this.slideLeft = this.slideLeft.bind(this);
		//this.slideRight = this.slideRight.bind(this);
		// this.clickDay = this.clickDay.bind(this);
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
	return {
		curWeekDay: state.mainContentsReducer.curWeekDay
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleChangeWeekDay: curWeekDay => {
			dispatch(actions.changeWeekDay(curWeekDay));
		}
	};
};

export default connect(mapStateToPrpos, mapDispatchToProps)(
	MainContentsContainer
);
