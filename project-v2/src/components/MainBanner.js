import React from 'react';

const MainBannerInfo = ({ src, alt }) => {
    const errfunc = e => {
        e.target.src = '/images/banner_naver.png';
    };
    return (
        <div className="main-banner-swiper-slide swiper-slide">
            <img className="main-banner-img" onError={errfunc} src={src} />
        </div>
    );
};
const MainBanner = ({ srcList }) => {
    const mapToMainBannerInfo = data => {
        return data.map((src, i, arr) => {
            return <MainBannerInfo src={src} key={i} />;
        });
    };
    return (
        <div>
            <div className="main-banner-swiper-container swiper-container">
                <div className="main-banner-swiper-wrapper swiper-wrapper">{mapToMainBannerInfo(srcList)}</div>
            </div>
        </div>
    );
};

export default MainBanner;
