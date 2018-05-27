import * as types from "../actions/ActionTypes";
import Firebase from "../lib/Firebase";
import commonUtil from "../lib/commonUtil";

const initialState = {
	viewToon: []
};

export default function mainContentsReducer(state = initialState, action) {
	switch (action.type) {
		case types.CHANGE_VIEWTOON:
			return {
				...state,
				viewToon: action.viewToon
			};
		//
		// 		...state,
		// 		currentWeekNum: action.currentWeekNum
		// 	};
		default:
			return state;
	}
}
