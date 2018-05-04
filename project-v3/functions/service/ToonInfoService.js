const firestoreUtil = require("../util/firestoreUtil");
const crawlingUtil = require("../util/crawlingUtil");
const commonUtil = require("../util/commonUtil");
const self = {
	createDataOfToonInfo: () => {
		let returnValue = [];
		let promises = [];
		let week = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
		for (let i = 0; i < week.length; i++) {
			promises.push(crawlingUtil.crawlToonInfo(week[i]));
		}
		return Promise.all(promises)
			.then(result => {
				for (let i in result) {
					result[i].map((i, ele) => {
						returnValue.push(ele.toonInfo);
					});
				}
			})
			.then(() => {
				return commonUtil.removeDuplicate(returnValue, "toon_info_idx");
			})
			.then(result => {
				return result.map(ele => {
					return {toonInfo: ele};
				});
			});
	},
	createToonInfoToday: () => {
		let lastResult;
		return self
			.createDataOfToonInfo()
			.then(result => {
				return firestoreUtil.convertObj2Doc(result);
			})
			.then(result2 => {
				lastResult = result2;
				return result2;
			})
			.then(result3 => {
				return firestoreUtil.insert(result3);
			})
			.then(result4 => {
				if (lastResult.length == result4[0].length) {
					return lastResult;
				} else {
					console.log(lastResult.length, result4[0].length);
					return false;
				}
			});
	}
};

module.exports = self;
