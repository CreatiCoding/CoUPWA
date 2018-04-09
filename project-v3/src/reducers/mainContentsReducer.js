import * as types from "../actions/ActionTypes";
// import Swiper from "swiper";

const initialState = {
	//weekAllToon: [],
	//curWeekDay: (new Date().getDay() + 6) % 7
	//contentsSwiper: new Swiper(".main-contents-swiper-container", {
	//	initialSlide: (new Date().getDay() + 6) % 7
	//})
};

//initialState.contentsSwiper.on("slideChange", function() {
//$(".main-contents-dow-btn")[initialState.curWeekDay].className = $(
//	".main-contents-dow-btn"
//)[initialState.curWeekDay].className.replace("clicked", "unclcked");
//$(".main-contents-dow-btn")[
//	initialState.contentsSwiper.activeIndex
//].className = $(".main-contents-dow-btn")[
//	initialState.contentsSwiper.activeIndex
//].className.replace("unclcked", "clicked");
//initialState.curWeekDay = initialState.contentsSwiper.activeIndex;
//});

export default function mainContentsReducer(state = initialState, action) {
	switch (action.type) {
		//case types.CHANGE_WEEKDAY:
		//	return {
		//		...state,
		//		curWeekDay: action.curWeekDay
		//	};
		//case types.INIT_CONTENTS_SWIPER:
		//	return {
		//		...state,
		//		contentsSwiper: action.contentsSwiper
		//	};
		//case types.RECEIVE_WEEKALLTOON:
		//	return {
		//		...state,
		//		weekAllToon: action.weekAllToon
		//	};
		default:
			return state;
	}
}
