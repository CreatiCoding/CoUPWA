const commonUtil = require("../common-util");
const properties = require("../properties.json");
const Toon = require("../model/Toon");
const ToonInfo = require("../model/ToonInfo");
const crawlService = require("../service/crawlService");
const imageDownloader = require("../service/imageDownloader");
const BannerImage = require("../model/BannerImage");
let fs = undefined;
if (process.argv[2] != undefined) {
	fs = require("../service/firestoreService");
}
const self = {
	processBannerImageList: () => {
		return imageDownloader
			.crawlBannerImage()
			.then(result => imageDownloader.downloadImageList(result))
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
				return fs.insert(arr);
			});
	}
};

module.exports = self;
