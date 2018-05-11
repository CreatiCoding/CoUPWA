import React, {Component} from "react";
import MainHeader from "../components/MainHeader";
import {connect} from "react-redux";
import * as actions from "../actions";
import $ from "jquery";
import "../css/MainHeaderContainer.css";
import coupwaFetch from "../lib/coupwaFetch";

let sortTypes = ["ViewCount", "Update", "StarScore", "TitleName"];

class MainHeaderContainer extends Component {
	constructor(props) {
		super(props);
		this.clickLeft = this.clickLeft.bind(this);
		this.clickRight = this.clickRight.bind(this);
		this.clickTypes = this.clickTypes.bind(this);
	}
	componentDidMount() {
		$(window).scroll(function() {
			if ($(this).scrollTop() === 0) {
				$(".main-header-navbar").addClass("hide");
				if ($(".dropdown button").attr("aria-expanded") === "true")
					$(".dropdown button").click();
			} else {
				$(".main-header-navbar").removeClass("hide");
			}
		});
	}
	clickLeft() {
		let n;
		for (let i = 0; i < 4; i++) {
			if (this.props.currentSortType === sortTypes[i]) {
				if (i == 0) n = 3;
				else n = i - 1;
			}
		}
		this.props.handleChangeSortType(sortTypes[n]);
	}
	clickRight() {
		let n;
		for (let i = 0; i < 4; i++) {
			if (this.props.currentSortType === sortTypes[i]) {
				if (i == 3) n = 0;
				else n = i + 1;
			}
		}
		this.props.handleChangeSortType(sortTypes[n]);
	}
	clickTypes(n) {
		this.props.handleChangeSortType(sortTypes[n]);
	}
	render() {
		return (
			<MainHeader
				currentSortType={this.props.currentSortType}
				clickLeft={this.clickLeft}
				clickRight={this.clickRight}
				clickTypes={n => {
					this.clickTypes(n);
				}}
			/>
		);
	}
}

const mapStateToPrpos = state => {
	return {
		currentSortType: state.mainHeaderReducer.currentSortType
	};
};

const mapDispatchToProps = dispatch => {
	let self = {
		handleChangeSortType: currentSortType => {
			coupwaFetch.fetchViewToon(
				currentSortType,
				self.handleChangeViewToon
			);
			dispatch(actions.changeSortType(currentSortType));
		},
		handleChangeViewToon: viewToon => {
			dispatch(actions.changeViewToon(viewToon));
		}
	};
	return self;
};

export default connect(mapStateToPrpos, mapDispatchToProps)(
	MainHeaderContainer
);
