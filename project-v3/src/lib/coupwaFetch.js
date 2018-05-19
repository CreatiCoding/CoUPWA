import Firebase from "./Firebase";
import commonUtil from "./commonUtil";

const week = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const coupwaFetch = {
	sliceString: (str, from, end) => {
		return str.substring(str.indexOf(from) + from.length, str.indexOf(end));
	},
	sliceStr: (str, from, size) => {
		return str.substr(str.indexOf(from) + from.length, size);
	},
	fetchViewToon: (sortType, callback) => {
		let promises = week.map((ele, i) => {
			let key =
				commonUtil.getDateFormat("YYMMDD") + "_" + sortType + "_" + ele;
			return Firebase.selectDoc("viewToon", key).then(result => {
				return result.view_toon_list;
			});
		});
		Promise.all(promises).then(result => {
			callback(result);
		});
		return true;
	},
	fetchViewBannerImage: callback => {
		let key = commonUtil.getDateFormat("YYMMDD");
		Firebase.selectDoc("viewBannerImage", key)
			.then(result => {
				return result.view_banner_image_list;
			})
			.then(result => {
				result = commonUtil.shuffleArray(result);
				callback(result);
			});

		return true;
	},
	fetchToonList: (toon_info_idx, callback) => {
		let key = toon_info_idx;
		Firebase.selectDoc("toonList", key)
			.then(result => {
				return result;
			})
			.then(r => callback(r));
		return true;
	}
};

export default coupwaFetch;
