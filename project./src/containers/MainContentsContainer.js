import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import MainContentsDOW from '../components/MainContentsDOW'
import $ from 'jquery';
import '../css/mainContentsDOW.css';
import MainContents from "../components/MainContents";
import Swiper from 'swiper';

class MainContentsContainer extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount(){
		this.swiper = new Swiper('.main-contents-swiper-container');
		$(window).scroll(function() {
			var stadard = $(".main-banner-swiper-container").position().top+$(".main-banner-swiper-container").height();
			var pos = $(window).scrollTop() + $('.main-header-navbar').height();
			if( pos > stadard ) {
				$('.main-contents-dow')
					.css("position", "fixed")
					.css("top",$('.main-header-navbar').height())
					.css("width",$('.main-banner-swiper-container').width())
					.css("border", "1px solid");
			} else {
				$('.main-contents-dow')
					.css("position", "")
					.css("top","")
					.css("width","")
					.css("border", "");
			}
		});
	}
	render() {
		return (
			<div>
				<MainContentsDOW/>
				<MainContents/>
			</div>
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
export default connect(mapStateToPrpos, mapDispatchToProps)(MainContentsContainer);
