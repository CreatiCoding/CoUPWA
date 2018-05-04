const firestoreService = require("../service/firestoreService");
const crawlService = require("../service/crawlService");
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
		let resultArr = [];
		return crawlService
			.crawlToonInfo(week)
			.then(result => {
				return firestoreService.convertObj2Doc(result);
			})
			.then(result2 => {
				resultArr.push(result2);
				return result2;
			})
			.then(result3 => {
				return firestoreService.insert(result3);
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
