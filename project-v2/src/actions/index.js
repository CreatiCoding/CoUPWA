import * as types from './ActionTypes';
import Swiper from 'swiper';

export function changeListType(curListType) {
	if (curListType < 0) curListType = 0;
	else if (curListType > 3) curListType = 3;
	return {
		type: types.CHANGE_LISTTYPE,
		curListType,
	};
}

export function changeWeekDay(curWeekDay) {
	if (curWeekDay < 0) curWeekDay = 0;
	else if (curWeekDay > 6) curWeekDay = 6;
	return {
		type: types.CHANGE_WEEKDAY,
		curWeekDay,
	};
}

export function initContentsSwiper(callback, n) {
	let swiper = (new Swiper('.main-contents-swiper-container', {
		initialSlide: ((new Date).getDay()+6)%7
	}));
	swiper.on('slideChange', callback);
	return {
		type: types.INIT_CONTENTS_SWIPER,
		contentsSwiper: swiper,
	};
}

export function receiveWeekAllToon(weekAllToon) {
	return {
		type: types.RECEIVE_WEEKALLTOON,
		weekAllToon,
	};
}
