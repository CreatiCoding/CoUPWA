const commonUtil = require("../common-util");
const properties = require("../properties.json");
const xmlParser = require("xml2js");

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
	crawlBannerImage: () => {
		return commonUtil
			.requestHTML([
				properties.url.bannerImageList.value,
				properties.url.bannerImageList.referer
			])
			.then(result => {
				return new Promise(resolve => {
					xmlParser.parseString(result, function(err, result2) {
						resolve(result2);
					});
				});
			})
			.then(result3 => {
				return result3.comics.comic.map((ele, i) => {
					return new BannerImage(
						"" +
							new Date()
								.toISOString()
								.substr(0, 10)
								.replace(/-/gi, "") +
							"" +
							(i > 99 ? i : i > 9 ? "0" + i : "00" + i),
						ele.bigImg[0],
						undefined,
						ele.url[0] //sliceString(, "titleId=", "&no=")
					);
				});
			});
	},
	downloadBannerImage: arr => {
		let promises = [];
		for (ele in arr)
			promises[promises.length] = commonUtil
				.requestHTML([ele.bigImg, ""])
				.then(result => {});
	}
};

module.exports = self;
