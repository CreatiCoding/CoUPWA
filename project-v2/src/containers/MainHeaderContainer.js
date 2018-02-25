import React, { Component } from 'react';
import MainHeader from '../components/MainHeader';
import { connect } from 'react-redux';
import * as actions from '../actions';
import $ from 'jquery';
import 'popper.js';
import 'bootstrap';

class MainHeaderContainer extends Component {
    constructor(props) {
        super(props);
        this.clickLeft = this.clickLeft.bind(this);
        this.clickRight = this.clickRight.bind(this);
        this.clickTypes = this.clickTypes.bind(this);
    }
    componentDidMount() {
        $(window).scroll(function() {
            if ($(this).scrollTop() == 0) {
                $('.main-header-navbar').addClass('hide');
				if ($(".dropdown .btn").attr("aria-expanded") === 'true')
					$('.dropdown .btn').dropdown("toggle");
            } else {
                $('.main-header-navbar').removeClass('hide');
            }
        });
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
			<div className="main-header-container">
            <MainHeader
                curListType={this.props.curListType}
                clickLeft={this.clickLeft}
                clickRight={this.clickRight}
                clickTypes={n => {
                    this.clickTypes(n);
                }}
            />
			</div>
        );
    }
}

const mapStateToPrpos = state => {
	return {
		curListType: state.mainHeaderReducer.curListType,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleChangeListType: curListType => {
			dispatch(actions.changeListType(curListType));
		},
	};
};

export default connect(mapStateToPrpos, mapDispatchToProps)(MainHeaderContainer);
