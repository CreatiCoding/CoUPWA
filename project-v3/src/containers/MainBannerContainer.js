import React, { Component } from 'react';
import MainBanner from '../components/MainBanner';
import Swiper from 'swiper';

class MainBannerContainer extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		new Swiper('.main-banner-swiper-container');
	}
	render() {
		const alt = 'image';
		const srcList = [
			'/bannerImage?num=0',
			'/bannerImage?num=1',
			'/bannerImage?num=2',
			'/bannerImage?num=3',
			'/bannerImage?num=4',
			'/bannerImage?num=5',
		];
		return (
			<MainBanner srcList={srcList}/>
		);
	}
}
