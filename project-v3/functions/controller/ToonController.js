const firestoreService = require("../service/firestoreService");
const crawlService = require("../service/crawlService");
const self = {
	createToonToday: () => {
		let sort_type = ["ViewCount", "Update", "StarScore", "TitleName"];
		let promises = [];
		for (i in sort_type) {
			promises.push(self.createToonBySortType(sort_type[i]));
		}
		return Promise.all(promises).then(result => {
			let arr = [];
			for (let i in result) arr = arr.concat(result[i]);
			return arr;
		});
	},
	createToonBySortType: sort_type => {
		sort_type = sort_type != undefined ? sort_type : "ViewCount";
		let resultArr = [];
		return crawlService
			.crawlToon(sort_type)
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
			})
			.then(result => {
				return firestoreService.insert(result);
			})
			.then(result2 => {
				if (resultArr[0].length == result2[0].length) {
					return result2[0];
				} else {
					console.log(resultArr[0].length, result2[0].length);
					return false;
				}
			});
	}
};

module.exports = self;
