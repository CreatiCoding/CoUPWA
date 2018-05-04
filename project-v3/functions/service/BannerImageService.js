const firestoreUtil = require("../util/firestoreUtil");
const imageDownloadUtil = require("../util/imageDownloadUtil");
const self = {
	processBannerImageList: () => {
		return imageDownloadUtil
			.crawlBannerImage()
			.then(result => imageDownloadUtil.downloadImageList(result))
			.then(result2 => {
				let arr = [];

				result2.map(ele => {
					let el = ele[Object.keys(ele)[0]];
					for (let attr in el) {
						let key = el[attr][Object.keys(el[attr])[0]].replace(
							/\//gi,
							"_"
						);
						arr.push({
							model: attr,
							key: key,
							data: el[attr]
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
