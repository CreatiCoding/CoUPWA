const firestoreUtil = require("../util/firestoreUtil");
const imageDownloadUtil = require("../util/imageDownloadUtil");
const self = {
	processThumbImageList: () => {
		return imageDownloadUtil
			.crawlThumbImage()
			.then(result => imageDownloadUtil.downloadImageList(result))
			.then(result2 => {
				let arr = [];
				//console.log(result2);
				result2.map(ele => {
					for (let item in ele) {
						let idx = Object.keys(ele[item])[0];
						arr.push({
							model: item,
							key: ele[item][idx].replace(/\//gi, "_"),
							data: ele[item]
						});
					}
				});
				return firestoreUtil.insert(arr).then(() => {
					return arr;
				});
			});
	}
};

module.exports = self;
