import React, { Component } from 'react';
import MainBanner from '../components/MainBanner';
import Swiper from 'swiper';
import '../css/swiper.min.css';

class MainBannerContainer extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.swiper = new Swiper('.main-banner-swiper-container');
	}
	render() {
		const alt = 'image';
		const srcList = ['/images/a.jpg', '/images/b.jpg', '/images/c.jpg'];
		return (
			<MainBanner alt={alt} srcList={srcList}/>
		);
	}
}

export default MainBannerContainer;
