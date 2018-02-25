import React from 'react';
import MainBannerContainer from '../containers/MainBannerContainer';
import MainContentsContainer from '../containers/MainContentsContainer';
import MainHeaderNav from './MainHeaderNav';

const Wrapper = () => {
    return (
        <div className="wrapper wrapper-width">
			<MainHeaderNav/>
            <MainBannerContainer />
			<MainContentsContainer/>
        </div>
    );
};

export default Wrapper;
