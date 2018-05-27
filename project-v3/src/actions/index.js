import * as types from "./ActionTypes";

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

export function loadToonList(toonInfo, toonList) {
	return {
		type: types.LOAD_TOONLIST,
		toonInfo,
		toonList
	};
}
