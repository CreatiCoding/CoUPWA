import React, { Component } from 'react';
import MainHeader from '../components/MainHeader';
import { connect } from 'react-redux';
import * as actions from '../actions';
const propTypes = {};

const defaultProps = {};

class MainHeaderContainer extends Component {
	constructor(props) {
		super(props);
		this.clickLeft = this.clickLeft.bind(this);
		this.clickRight = this.clickRight.bind(this);
		this.clickTypes = this.clickTypes.bind(this);
	}
	clickLeft() {
		this.props.handleChangeListType(this.props.curListType - 1);
	}
	clickRight() {
		this.props.handleChangeListType(this.props.curListType + 1);
	}
	clickTypes(n) {
		this.props.handleChangeListType(n);
	}
	render() {
		return (
			<MainHeader
				curListType={this.props.curListType}
				clickLeft={this.clickLeft}
				clickRight={this.clickRight}
				clickTypes={n => {
					this.clickTypes(n);
				}}
			/>
		);
	}
}

MainHeaderContainer.propTypes = propTypes;
MainHeaderContainer.defaultProps = defaultProps;

const mapStateToPrpos = state => {
	return {
		curListType: state.mainHeaderReducer.curListType,
		listTypes: ['조회순', '업데이트순', '별점순', '제목순', '오픈순'],
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleChangeListType: curListType => {
			dispatch(actions.changeListType(curListType));
		},
	};
};

export default connect(mapStateToPrpos, mapDispatchToProps)(
	MainHeaderContainer,
);
