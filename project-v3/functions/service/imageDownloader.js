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
						sliceString(ele.url[0], "titleId=", "&no=")
					);
				});
			});
	},
	downloadBannerImage: args => {
		let bannerImage =
			args.bannerImage != undefined ? args.bannerImage : args[0];
		return new Promise((resolve, reject) => {
			commonUtil
				.requestImage([
					bannerImage.banner_url,
					properties.url.bannerImage.referer
				])
				.then(result => {
					console.log(1, "image request is finished.");
					return commonUtil
						.storeImageToBucket([
							result.body,
							"/banner/" +
								result.req.path.substr(
									result.req.path.lastIndexOf("/") + 1
								),
							result.headers["content-type"],
							result,
							{}
						])
						.then(result2 => {
							console.log(2, "image store is finished.");
							result2.bannerImage = bannerImage;
							resolve(result2);
						});
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	downloadBannerImageList: args => {
		let bannerImageList =
			args.bannerImageList != undefined ? args.bannerImageList : args[0];
		var promises = [];
		console.log(bannerImageList);
		for (let i = 0; i < bannerImageList.length; i++) {
			promises.push(
				(data => {
					return new Promise(resolve => {
						resolve(self.downloadBannerImage([data]));
					});
				})(bannerImageList[i])
			);
		}
		return Promise.all(promises)
			.then(data => {
				console.log(3, "all process is finished.");
				return data;
			})
			.catch(e => {
				console.log(e);
				return e;
			});
	}
};

module.exports = self;
