import * as types from "../actions/ActionTypes";
import Firebase from "../lib/Firebase";
import commonUtil from "../lib/commonUtil";

const initialState = {
	weekNum: new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
};

export default function mainContentsReducer(state = initialState, action) {
	switch (action.type) {
		case types.CHANGE_WEEKNUM:
			return {
				...state,
				weekNum: action.weekNum
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
