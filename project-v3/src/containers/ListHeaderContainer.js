import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions";
import $ from "jquery";
import coupwaFetch from "../lib/coupwaFetch";
import "../css/ListHeader.css";
import {Link} from "react-router-dom";

class ListHeaderContainer extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {}
	render() {
		return (
			<div className="header">
				<span className="backbutton">
					<Link to="/">◀</Link>
				</span>
				<span>웹툰명</span>
				<span className="like">
					<a href="#">관심</a>
				</span>
				<span className="first-chapter">
					<a href="#">첫화보기</a>
				</span>
			</div>
		);
	}
}

const mapStateToPrpos = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	let self = {};
	return self;
};

export default connect(mapStateToPrpos, mapDispatchToProps)(
	ListHeaderContainer
);
