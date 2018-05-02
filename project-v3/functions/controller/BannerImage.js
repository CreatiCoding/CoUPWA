const commonUtil = require("../common-util");
const properties = require("../properties.json");
const Toon = require("../model/Toon");
const ToonInfo = require("../model/ToonInfo");
const crawlService = require("../service/crawlService");
const imageDownloader = require("../service/imageDownloader");
const BannerImage = require("../model/BannerImage");

function sliceString(str, from, end) {
	return str.substring(str.indexOf(from) + from.length, str.indexOf(end));
}
function sliceStr(str, from, size) {
	return str.substr(str.indexOf(from) + from.length, size);
}
function strCodePoint(a) {
	while (a.indexOf("&#x") != -1) {
		a =
			a.slice(0, a.indexOf("&#x")) +
			String.fromCodePoint(
				"0" + a.slice(a.indexOf("&#x") + 2, a.indexOf("&#x") + 7)
			) +
			a.slice(a.indexOf("&#x") + 8);
	}
	return a;
}

const self = {
	processBannerImageList: () => {
		imageDownloader
			.crawlBannerImage()
			.then(result => imageDownloader.downloadImageList(result))
			.then(result2 => {
				console.log(result2);
			});
	}
};

module.exports = self;
