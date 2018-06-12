import Firebase from "./Firebase";
import commonUtil from "./commonUtil";
import offlineUtil from "./offlineUtil";
import indexedDBUtil from "./indexedDBUtil";
import db from "./db";

const week = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const self = {
	sliceString: (str, from, end) => {
		return str.substring(str.indexOf(from) + from.length, str.indexOf(end));
	},
	sliceStr: (str, from, size) => {
		return str.substr(str.indexOf(from) + from.length, size);
	},
	fetchViewToon: sortType => {
		let returnValue = [];
		let promises = week.map((ele, i) => {
			let key = "180612" + "_" + sortType + "_" + ele;
			return Firebase.selectDoc("viewToon", key).then(result => {
				returnValue[returnValue.length] = result.view_toon_list;
				return result.view_toon_list;
			});
		});
		return Promise.all(promises).then(() => {
			return returnValue;
		});
	},
	fetchViewToonCaching: sortType => {
		return db.getViewToon("180612", sortType).then(r => {
			if (!r) {
				console.log("캐싱된 데이터가 없습니다.");
				return offlineUtil.cacheViewToon("180612", sortType);
				//return self.fetchViewToon(sortType);
			} else {
				console.log("캐싱된 데이터를 불러옵니다.");
				return r.data;
			}
		});
	},

	fetchViewBannerImageCaching2: () => {
		let cache = localStorage.getItem("180612");
		if (cache === null) {
			return self.fetchViewBannerImage().then(r => {
				localStorage.setItem("180612", JSON.stringify(r));
				return r;
			});
		} else {
			return Promise.resolve(JSON.parse(cache));
		}
	},
	fetchViewBannerImage: () => {
		let key = "180612";
		return Firebase.selectDoc("viewBannerImage", key)
			.then(result => {
				return result.view_banner_image_list;
			})
			.then(result => {
				result = commonUtil.shuffleArray(result);
				return result;
			});
	},
	fetchViewBannerImageCaching: () => {
		return db.getViewBannerImage("180612").then(r => {
			if (!r) {
				console.log("캐싱된 데이터가 없습니다.");
				return offlineUtil.cacheViewBannerImage("180612");
			} else {
				console.log("캐싱된 데이터를 불러옵니다.");
				return r.data;
			}
		});
	},
	fetchToonList: toon_info_idx => {
		let key = toon_info_idx;
		return Firebase.selectDoc("toonList", key).then(result => {
			console.log(result);
			return result;
		});
	},
	fetchToonListCaching: toon_info_idx => {
		return db.getToonList(toon_info_idx).then(r => {
			if (!r) {
				console.log("캐싱된 데이터가 없습니다.");
				return offlineUtil.cacheToonList(toon_info_idx);
			} else {
				console.log("캐싱된 데이터를 불러옵니다.");
				return r.data;
			}
		});
	}
};

export default self;
