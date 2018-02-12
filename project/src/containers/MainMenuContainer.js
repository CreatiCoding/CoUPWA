import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainMenu from '../components/MainMenu';
import $ from 'jquery';
import * as actions from '../actions';

class MainMenuContainer extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount(){
		/*$(window).resize(function(){
			var _originalSize = $(window).width() + $(window).height();
			if($(window).width() + $(window).height() != _originalSize){
				$(".main-menu").css("display","block");
				console.log($(window).width() + $(window).height());
			}else{
				$(".main-menu").css("display","none");
				console.log($(window).width() + $(window).height());
			}
		});*/
	}
	render() {
		return (
			<MainMenu/>
		);
	}
}
const mapStateToPrpos = state => {
	return {
	};
};
const mapDispatchToProps = dispatch => {
	return {
	};
};
export default connect(mapStateToPrpos, mapDispatchToProps)(MainMenuContainer);
