import * as types from './ActionTypes';

export function changeListType(curListType) {
	if (curListType < 0) curListType = 0;
	else if (curListType > 4) curListType = 4;

	return {
		type: types.CHANHE_LISTTYPE,
		curListType,
	};
}
