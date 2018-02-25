import React, { Component } from 'react';
import MainContentsDOW from '../components/MainContentsDOW';
import MainContents from '../components/MainContents';
import { connect } from 'react-redux';
import * as actions from '../actions';
import $ from 'jquery';
import axios from 'axios';

class MainContentsContainer extends Component {
    constructor(props) {
        super(props);
        this.slideLeft = this.slideLeft.bind(this);
        this.slideRight = this.slideRight.bind(this);
        this.clickDay = this.clickDay.bind(this);
    }

    componentDidMount() {
    	const self = this;

        axios({
				method: 'get',
				url: '/getWeekAllToonInfoBySort',
			})
            .then(function(response) {
                let data = response.data;
                let weekAllToon = [[], [], [], [], [], [], []];
                for (let i = 0; i < data.length; i++) {
                    switch (data[i]['weekDay']) {
                        case 'mon':
                            weekAllToon[0].push(data[i]);
                            break;
                        case 'tue':
                            weekAllToon[1].push(data[i]);
                            break;
                        case 'wed':
                            weekAllToon[2].push(data[i]);
                            break;
                        case 'thu':
                            weekAllToon[3].push(data[i]);
                            break;
                        case 'fri':
                            weekAllToon[4].push(data[i]);
                            break;
                        case 'sat':
                            weekAllToon[5].push(data[i]);
                            break;
                        case 'sun':
                            weekAllToon[6].push(data[i]);
                            break;
                    }
                }
                let weekAllToonName = "weekAllToon"+(new Date).toISOString().slice(0,10);
                let stringAll = JSON.stringify(weekAllToon);

                if( localStorage.getItem(weekAllToonName) === null )
					localStorage.setItem(weekAllToonName, stringAll);

				let weekAllToonParam = [[],[],[],[],[],[],[]];
				for(let i=0;i<7;i++){
					weekAllToonParam[i] = new Array();
					for(let j=0; j<weekAllToon[i].length; ++j) weekAllToonParam[i].push("yet");
				}
                let num = [(new Date().getDay() + 6) % 7];
				weekAllToonParam[num] = eval('(' + JSON.stringify(weekAllToon[num]) + ')');
                self.props.handleReceiveWeekAllToon(weekAllToonParam);

				self.props.handleInitContentsSwiper(() => {
					// slide change 될때 발생하는 함수를 넣어주면 된다.
					if(self.props.weekAllToon[self.props.contentsSwiper.activeIndex][0] === 'yet') {
						self.props.weekAllToon[self.props.contentsSwiper.activeIndex] = JSON.parse(localStorage.getItem(weekAllToonName))[self.props.contentsSwiper.activeIndex];
						self.props.handleReceiveWeekAllToon(self.props.weekAllToon);
					}
					self.clickDay(self.props.contentsSwiper.activeIndex);
				}, self.props.curWeekDay);
			})
            .catch(function(error) {
                console.log('axios error about getWeekAllToonInfoBySort', error);
            });



        $('.main-contents-dow-btn')[this.props.curWeekDay].className = $('.main-contents-dow-btn')[
            this.props.curWeekDay
        ].className.replace('unclcked', 'clicked');

        $(window).scroll(function() {
            var stadard =
                $('.main-banner-swiper-container').position().top + $('.main-banner-swiper-container').height();
            var pos = $(window).scrollTop() + $('.main-header-navbar').height();
            if (pos > stadard) {
                $('.main-contents-dow')
                    .css('position', 'fixed')
                    .css('top', $('.main-header-navbar').height())
                    .css('width', $('.main-banner-swiper-container').width());
                $('.main-contents-swiper-container').css('margin-top', $('.main-header-navbar').height());
            } else {
                $('.main-contents-dow')
                    .css('position', '')
                    .css('top', '')
                    .css('width', '');
                $('.main-contents-swiper-container').css('margin-top', 0);
            }
        });
    }

    slideLeft() {
    	console.log("왼쪽으로 움직입니다.");
		let weekAllToonName = "weekAllToon"+(new Date).toISOString().slice(0,10);
    	let weekAllToon = JSON.parse(localStorage.getItem(weekAllToonName))[this.props.curWeekDay - 1];
    	/*for(let i = 0;i<weekAllToon.length;i++){
			$($($(".main-contents-swiper-slide")[this.props.curWeekDay - 1]).find(".main-contents-toon")[i])
				.find(".main-contents-toon-thumbnail").attr("src", "/images?path="+weekAllToon[i].path);
			$($($(".main-contents-swiper-slide")[this.props.curWeekDay - 1]).find(".main-contents-toon")[i])
				.find(".main-contents-toon-title").html(weekAllToon[i].title);
			$($($(".main-contents-swiper-slide")[this.props.curWeekDay - 1]).find(".main-contents-toon")[i])
				.find(".main-contents-toon-author").html(weekAllToon[i].author);
			$($($(".main-contents-swiper-slide")[this.props.curWeekDay - 1]).find(".main-contents-toon")[i])
				.find(".main-contents-toon-rate").html(weekAllToon[i].rate);
			$($($(".main-contents-swiper-slide")[this.props.curWeekDay - 1]).find(".main-contents-toon")[i])
				.find(".main-contents-toon-update").html(((weekAllToon[i].update)?"UP":""));
		}*/
		this.props.handleReceiveWeekAllToon(weekAllToon);
        this.props.handleChangeWeekDay(this.props.curWeekDay - 1);
    }
    slideRight() {

        this.props.handleChangeWeekDay(this.props.curWeekDay + 1);
    }
    clickDay(n) {
        $('.main-contents-dow-btn')[this.props.curWeekDay].className = $('.main-contents-dow-btn')[
            this.props.curWeekDay
        ].className.replace('clicked', 'unclcked');
        $('.main-contents-dow-btn')[n].className = $('.main-contents-dow-btn')[n].className.replace(
            'unclcked',
            'clicked'
        );
        this.props.handleChangeWeekDay(n);
    }

    render() {
        return (
            <div>
                <MainContentsDOW
                    curWeekDay={this.props.curWeekDay}
                    clickDay={n => {
                        this.clickDay(n);
                    }}
                    swiper={this.props.contentsSwiper}
                />
                <MainContents
					weekAllToon={this.props.weekAllToon}
				/>
            </div>
        );
    }
}

const mapStateToPrpos = state => {
    return {
        weekAllToon: state.mainContentsReducer.weekAllToon,
        curWeekDay: state.mainContentsReducer.curWeekDay,
        contentsSwiper: state.mainContentsReducer.contentsSwiper,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleChangeWeekDay: curWeekDay => {
            dispatch(actions.changeWeekDay(curWeekDay));
        },
        handleInitContentsSwiper: (callback, n) => {
            dispatch(actions.initContentsSwiper(callback, n));
        },
        handleReceiveWeekAllToon: weekAllToon => {
            dispatch(actions.receiveWeekAllToon(weekAllToon));
        },
    };
};

export default connect(mapStateToPrpos, mapDispatchToProps)(MainContentsContainer);
