const firestoreUtil = require("../util/firestoreUtil");
const crawlingUtil = require("../util/crawlingUtil");
const self = {
	createToonToday: () => {
		let sortType = ["ViewCount", "Update", "StarScore", "TitleName"];
		let promises = [];
		for (let i in sortType) {
			promises.push(self.createToonBySortType(sortType[i]));
		}
		return Promise.all(promises).then(result => {
			let arr = [];
			for (let i in result) {
				arr = arr.concat(result[i]);
			}
			return arr;
		});
	},
	/**
	 * createToonBySortType
	 * input : "ViewCount" 혹은 "Update", "StarScore", "TitleName"
	 * output: false | [(docObject, docObject, ...)]
	 */
	createToonBySortType: sortType => {
		sortType = sortType !== undefined ? sortType : "ViewCount";
		let lastResult;
		return crawlingUtil
			.crawlToon(sortType)
			.then(result => {
				return firestoreUtil.convertObjs2Doc(result);
			})
			.then(result2 => {
				lastResult = result2;
				return result2;
			})
			.then(result3 => {
				return firestoreUtil.insert(result3);
			})
			.then(result4 => {
				if (lastResult.length === result4[0].length) {
					return lastResult;
				} else {
					console.log(resultArr[0].length, result4[0].length);
					return false;
				}
			});
	}
};

module.exports = self;
