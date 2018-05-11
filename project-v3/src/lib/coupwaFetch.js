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
	},
	fetchViewBannerImage: callback => {
		let key = commonUtil.getDateFormat("YYMMDD");
		Firebase.selectDoc("viewBannerImage", key)
			.then(result => {
				return result.view_banner_image_list;
			})
			.then(result => {
				result = commonUtil.shuffleArray(result);
				result = result.slice(0, 8);
				console.log("fetchViewBannerImage", result);
				callback(result);
			});
	}
};

export default coupwaFetch;
