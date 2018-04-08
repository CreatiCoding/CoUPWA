import * as types from "../actions/ActionTypes";

const initialState = {
	curListType: 0
};

export default function mainHeaderReducer(state = initialState, action) {
	switch (action.type) {
		case types.CHANGE_LISTTYPE:
			return {
				...state,
				curListType: action.curListType
			};
		default:
			return state;
	}
}
