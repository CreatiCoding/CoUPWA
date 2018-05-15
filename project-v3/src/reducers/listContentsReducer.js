import * as types from "../actions/ActionTypes";
import Firebase from "../lib/Firebase";
import commonUtil from "../lib/commonUtil";

const initialState = {
	toonInfo: {},
	toonList: []
};

export default function listContentsReducer(state = initialState, action) {
	switch (action.type) {
		case types.LOAD_TOONLIST:
			return {
				...state,
				toonInfo: action.toonInfo,
				toonList: action.toonList
			};
		default:
			return state;
	}
}
