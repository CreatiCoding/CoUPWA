const firestoreUtil = require("../util/firestoreUtil");
const crawlingUtil = require("../util/crawlingUtil");
const self = {
	createToonInfoToday: () => {
		let week = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
		let promises = [];
		for (let i in week) {
			promises.push(self.createToonInfoByWeekDay(week[i]));
		}
		return Promise.all(promises).then(result => {
			let arr = [];
			for (let i in result) {
				arr = arr.concat(result[i]);
			}
			return arr;
		});
	},
	createToonInfoByWeekDay: week => {
		week = week != undefined ? week : "mon";
		let lastResult;
		return crawlingUtil
			.crawlToonInfo(week)
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
					console.log(resultArr[0].length, result4[0].length);
					return false;
				}
			});
	}
};

module.exports = self;
