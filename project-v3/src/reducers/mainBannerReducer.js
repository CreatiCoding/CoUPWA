import * as types from "../actions/ActionTypes";
import Firebase from "../lib/Firebase";
import commonUtil from "../lib/commonUtil";

const initialState = {
	viewBannerImage: []
};

export default function mainBannerReducer(state = initialState, action) {
	switch (action.type) {
		case types.CHANGE_VIEWBANNERIMAGE:
			return {
				...state,
				viewBannerImage: action.viewBannerImage
			};
		// 	state["viewToon_" + action.weekday] = action.value;
		// 	return state;

		// {
		// 		...state,
		// 		viewToon: {
		// 			...state.viewToon,
		// 			action['sortType'] : {
		//
		// 			}
		// 		}
		// 	};
		// case types.CHANGE_WEEKNUM:
		// 	return {
		// 		...state,
		// 		currentWeekNum: action.currentWeekNum
		// 	};
		default:
			return state;
	}
}
