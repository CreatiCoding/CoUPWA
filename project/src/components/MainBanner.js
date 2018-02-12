import React from 'react';
import '../css/mainBanner.css';

const MainBannerInfo = ({ src, alt }) => {
    return (
        <div className="main-banner-swiper-slide swiper-slide">
            <img className="main-banner-img" src={src} alt={alt} />
        </div>
    );
};
const MainBanner = ({ alt, srcList }) => {
    const mapToMainBannerInfo = data => {
        return data.map((src, i, alt) => {
            return <MainBannerInfo alt={alt} src={src} key={i} />;
        });
    };
    return (
        <div>
            <div className="main-banner-swiper-container swiper-container">
                <div className="main-banner-swiper-wrapper swiper-wrapper">{mapToMainBannerInfo(srcList, alt)}</div>
            </div>
        </div>
    );
};

export default MainBanner;
