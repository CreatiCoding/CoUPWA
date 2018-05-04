const firestoreService = require("../service/firestoreService");
const crawlService = require("../service/crawlService");
const self = {
	createToonToday: () => {
		let resultArr = [];
		return crawlService
			.crawlToon()
			.then(result => {
				let arr = [];

				for (let i = 0; i < result.length; i++) {
					let model = Object.keys(result[i])[0];
					let data = result[i][model];
					let key = data[Object.keys(data)[0]];
					arr.push({
						model: model,
						key: key,
						data: data
					});
				}
				resultArr.push(arr);
				return arr;
				// arr.push({
				// 	key: result[ele],
				// 	model: ,
				// 	data: result[ele]
				// });
			})
			.then(result => {
				return firestoreService.insert(result);
			})
			.then(result2 => {
				if (resultArr[0].length == result2[0].length) {
					return result2;
				} else {
					console.log(resultArr[0].length, result2[0].length);
					return false;
				}
			});
	}
};

module.exports = self;
