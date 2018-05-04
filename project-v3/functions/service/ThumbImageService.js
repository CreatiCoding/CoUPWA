const imageDownloadUtil = require("../util/imageDownloadUtil");
const firestoreUtil = require("../util/firestoreUtil");

const self = {
	processThumbImageList: () => {
		return imageDownloadUtil
			.crawlThumbImage()
			.then(result => imageDownloadUtil.downloadImageList(result))
			.then(result2 => {
				let arr = [];

				result2.map(ele => {
					for (let attr in ele) {
						let key = ele[attr][Object.keys(ele[attr])[0]].replace(
							/\//gi,
							"_"
						);
						arr.push({
							model: attr,
							key: key,
							data: ele[attr]
						});
					}
				});
				return firestoreUtil.insert(arr).then(() => {
					return result2;
				});
			});
	}
};

module.exports = self;
