import Firebase from "../lib/Firebase";
import commonUtil from "../lib/commonUtil";

const self = {
	// getViewToon: (sort_type, weekNum) => {
	// 	let week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
	// 	let key =
	// 		commonUtil.getDateFormat("YYMMDD") +
	// 		"_" +
	// 		sort_type +
	// 		"_" +
	// 		week[weekNum];
	// 	return Firebase.selectDoc("viewToon", key).then(result => {
	// 		return result.view_toon_list;
	// 	});
	// },
	// getTodayViewToon: () => {
	// 	return self.getViewToon("ViewCount", new Date().getDay());
	// }
};

export default self;
