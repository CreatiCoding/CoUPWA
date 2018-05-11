import * as types from "../actions/ActionTypes";

const initialState = {
	currentSortType: "ViewCount"
};

export default function mainHeaderReducer(state = initialState, action) {
	switch (action.type) {
		case types.CHANGE_SORTTYPE:
			return {
				...state,
				currentSortType: action.currentSortType
			};
		default:
			return state;
	}
}
