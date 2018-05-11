import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions";
import MainContents from "../components/MainContents";
import Firebase from "../lib/Firebase";
import commonUtil from "../lib/commonUtil";

class MainContentsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			viewToon: []
		};
	}
	componentDidMount() {
		let self = this;

		let week = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
		let promises = week.map((ele, i) => {
			let key =
				commonUtil.getDateFormat("YYMMDD") +
				"_" +
				"ViewCount" +
				"_" +
				ele;
			return Firebase.selectDoc("viewToon", key).then(result => {
				return result.view_toon_list;
			});
		});
		Promise.all(promises).then(result => {
			console.log(result);
			self.setState({
				viewToon: result
			});
		});
		// Firebase.selectDoc("viewToon", key).then(result => {
		// 	console.log(result);
		// 	self.setState({
		// 		viewToon: result.view_toon_list
		// 	});
		// });

		// this.props.handleInitViewToon();
	}

	changeWeekNum(weekNum) {
		this.props.handleChangeWeekNum(weekNum);
	}

	render() {
		return (
			<div>
				<MainContents
					viewToon={this.state.viewToon}
					// sortType={this.props.sortType}
					// currentWeekNum={this.props.currentWeekNum}
					changeWeekNum={n => {
						this.changeWeekNum(n);
					}}
				/>
			</div>
		);
	}
}

const mapStateToPrpos = state => {
	return {
		weekNum: state.mainContentsReducer.weekNum
		// currentWeekNum: state.mainContentsReducer.currentWeekNum
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleChangeWeekNum: weekNum => {
			dispatch(actions.changeWeekNum(weekNum));
		}
		// handleChangeCurrentWeekNum: nextWeekNum => {
		// 	dispatch(actions.changeWeekNum(nextWeekNum));
		// }
	};
};
export default connect(mapStateToPrpos, mapDispatchToProps)(
	MainContentsContainer
);
