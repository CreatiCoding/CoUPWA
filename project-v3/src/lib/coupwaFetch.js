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
			let key =
				commonUtil.getDateFormat("YYMMDD") + "_" + sortType + "_" + ele;
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
		return db.getViewToon(commonUtil.getYYMMDD(), sortType).then(r => {
			if (!r) {
				console.log("캐싱된 데이터가 없습니다.");
				return offlineUtil.cacheViewToon(
					commonUtil.getYYMMDD(),
					sortType
				);
				//return self.fetchViewToon(sortType);
			} else {
				console.log("캐싱된 데이터를 불러옵니다.");
				return r.data;
			}
		});
	},

	fetchViewBannerImageCaching2: () => {
		let cache = localStorage.getItem(commonUtil.getDateFormat("YYMMDD"));
		if (cache === null) {
			return self.fetchViewBannerImage().then(r => {
				localStorage.setItem(
					commonUtil.getDateFormat("YYMMDD"),
					JSON.stringify(r)
				);
				return r;
			});
		} else {
			return Promise.resolve(JSON.parse(cache));
		}
	},
	fetchViewBannerImage: () => {
		let key = commonUtil.getDateFormat("YYMMDD");
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
		return db.getViewBannerImage(commonUtil.getYYMMDD()).then(r => {
			if (!r) {
				console.log("캐싱된 데이터가 없습니다.");
				return offlineUtil.cacheViewBannerImage(commonUtil.getYYMMDD());
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
