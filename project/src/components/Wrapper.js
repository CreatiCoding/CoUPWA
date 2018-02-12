import React from 'react';
import MainBannerContainer from '../containers/MainBannerContainer';
import MainContentsContainer from '../containers/MainContentsContainer';
import '../css/wrapper.css';

const Wrapper = () => {
	return <div className="wrapper">
		<MainBannerContainer/>
		<MainContentsContainer/>
	</div>;
};

export default Wrapper;
