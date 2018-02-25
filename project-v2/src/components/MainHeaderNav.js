import React from 'react';
import fire from '../fire';
import axios from 'axios';

const MainHeaderNav = ({}) => {
    let src = '/images/naver_icon_144.png';
    let url = 'https://m.naver.com';

    const messaging = fire.messaging();
    const requestAlarm = function() {
        messaging
            .requestPermission()
            .then(function() {
                return messaging.getToken();
            })
            .then(function(currentToken) {
            	alert("공지사항 수신 등록되었습니다.");
                console.log('요청완료됨');
                axios({
                    method: 'get',
                    url: '/addReceiver?token=' + currentToken,
                });
            })
            .catch(function(err) {
                console.log('요청거부됨', err);
            });
    };
    return (
        <div className="wrapper-width main-header-nav">
            <a href={url}>
                <img className="img-test" src={src} />
            </a>
            <h1 className="header-nav-font default-font-bold">
                <a href="/">
                    <span>프로그레시브 웹툰</span>
                </a>
            </h1>
            <a className="btn default-font" onClick={requestAlarm}>
                공지사항 수신
            </a>
        </div>
    );
};

export default MainHeaderNav;
