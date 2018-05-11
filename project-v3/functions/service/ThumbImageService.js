const firestoreUtil = require("../util/firestoreUtil");
const imageDownloadUtil = require("../util/imageDownloadUtil");
const self = {
	createThumbImageToday: () => {
		let arr2 = [];
		return imageDownloadUtil
			.crawlThumbImage()
			.then(result => imageDownloadUtil.downloadImageList(result))
			.then(result2 => {
				//console.log(result2);
				let arr = result2.map(ele => {
					let ret = [];
					for (let item in ele) {
						let idx = Object.keys(ele[item])[0];
						ret.push({
							model: item,
							key: ele[item][idx].replace(/\//gi, "_"),
							data: ele[item]
						});
					}
					return ret;
				});
				for (let i in arr) {
					arr2.push(arr[i][0]);
					arr2.push(arr[i][1]);
					arr2.push(arr[i][2]);
				}
				return firestoreUtil.insert(arr2);
			})
			.then(() => {
				console.log(arr2);
				return arr2;
			});
	}
};

module.exports = self;
