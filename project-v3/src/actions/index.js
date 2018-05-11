import * as types from "./ActionTypes";
import mainContentsAction from "./MainContentsAction";
import commonUtil from "../lib/commonUtil";
//
export function changeViewBannerImage(viewBannerImage) {
	return {
		type: types.CHANGE_VIEWBANNERIMAGE,
		viewBannerImage
	};
}
export function changeViewToon(viewToon) {
	return {
		type: types.CHANGE_VIEWTOON,
		viewToon
	};
}

export function changeSortType(currentSortType) {
	return {
		type: types.CHANGE_SORTTYPE,
		currentSortType
	};
}
//
// export function changeWeekNum(weekNum) {
// 	console.log("weekNum", weekNum);
// 	return {
// 		type: types.CHANGE_WEEKNUM,
// 		weekNum
// 	};
// }
//
// export function dispatchViewToon(args) {
// 	let weekday = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
// 	if (args === undefined) {
// 		return function(dispatch) {
// 			return mainContentsAction.getTodayViewToon().then(result => {
// 				return dispatch(
// 					initViewToon(commonUtil.getDateFormat("eee"), result)
// 				);
// 			});
// 		};
// 	} else {
// 		return function(dispatch) {
// 			return mainContentsAction.getViewToon(args[0]).then(result => {
// 				return dispatch(initViewToon(weekday[args[0]], result));
// 			});
// 		};
// 	}
// }
