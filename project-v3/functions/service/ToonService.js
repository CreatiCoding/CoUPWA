const firestoreUtil = require("../util/firestoreUtil");
const crawlingUtil = require("../util/crawlingUtil");
const self = {
	createToonToday: () => {
		let sort_type = ["ViewCount", "Update", "StarScore", "TitleName"];
		let promises = [];
		for (let i in sort_type) {
			promises.push(self.createToonBySortType(sort_type[i]));
		}
		return Promise.all(promises).then(result => {
			let arr = [];
			for (let i in result) {
				arr = arr.concat(result[i]);
			}
			return arr;
		});
	},
	createToonBySortType: sort_type => {
		sort_type = sort_type != undefined ? sort_type : "ViewCount";
		let resultArr = [];
		return crawlingUtil
			.crawlToon(sort_type)
			.then(result => {
				return firestoreUtil.convertObj2Doc(result);
			})
			.then(result2 => {
				resultArr.push(result2);
				return result2;
			})
			.then(result3 => {
				return firestoreUtil.insert(result3);
			})
			.then(result4 => {
				if (resultArr[0].length == result4[0].length) {
					return result4[0];
				} else {
					console.log(resultArr[0].length, result4[0].length);
					return false;
				}
			});
	}
};

module.exports = self;
