import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../actions";
import $ from "jquery";
import coupwaFetch from "../lib/coupwaFetch";

class ListHeaderContainer extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {}
	render() {
		return <div />;
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
