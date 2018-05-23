import Firebase from "./Firebase";
import commonUtil from "./commonUtil";
import offlineUtil from "./offlineUtil";
import indexedDBUtil from "./indexedDBUtil";

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
		let arr = [];
		return offlineUtil.isCachedViewToon(sortType).then(r => {
			if (r) {
				console.log(r);
				return r.result;
			} else {
				console.log("캐싱된 데이터가 없습니다.");
				return self
					.fetchViewToon(sortType)
					.then(r => {
						arr.push({
							key:
								commonUtil.getDateFormat("YYMMDD") +
								"_" +
								sortType,
							data: r
						});
						return indexedDBUtil.insert("coupwa", "viewToon", arr);
					})
					.then(r => {
						if (r) console.log("캐시로 저장되었습니다.");
						return arr[0].data;
					});
			}
		});
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
	fetchToonList: toon_info_idx => {
		let key = toon_info_idx;
		return Firebase.selectDoc("toonList", key).then(result => {
			return result;
		});
	}
};

export default self;
