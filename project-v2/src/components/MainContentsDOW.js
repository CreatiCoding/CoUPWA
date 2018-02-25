import React from 'react';

const MainContentsDOW = ({ curWeekDay, clickDay, swiper }) => {
    const dowList = ['월', '화', '수', '목', '금', '토', '일'];

    const mapToMainContentsDow = data => {
        return data.map((ele, i) => {
            return (
                <div
                    className="main-contents-dow-btn unclcked default-font col col-sm col-md col-lg col-xl"
                    key={i}
                    onClick={() => {
                        clickDay(i);
                        console.log(swiper);
                        swiper.slideTo(i);
                    }}
                >
                    {ele}
                </div>
            );
        });
    };
    return (
        <div className="main-contents-dow container-fluid">
            <div className="row main-contents-dow-row">{mapToMainContentsDow(dowList)}</div>
        </div>
    );
};

export default MainContentsDOW;
