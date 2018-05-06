const commonUtil = require("./commonUtil");
const properties = require("../properties.json");
const xmlParser = require("xml2js");
const BannerImage = require("../model/BannerImage");
const ThumbImage = require("../model/ThumbImage");

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
					return BannerImage.instance(ele, i);
				});
			})
			.then(result4 => {
				// result4 = [result4[0], result4[1]];
				return [result4, self.downloadBannerImage];
			});
	},
	crawlThumbImage: () => {
		return commonUtil
			.requestHTML([
				properties.url.thumbImageList.value,
				properties.url.thumbImageList.referer
			])
			.then(result => {
				return commonUtil.crawlingHTMLArray([result, ".thumb a"]);
			})
			.then(result2 => {
				return result2.map((i, ele) => {
					return ThumbImage.instance(ele, i);
				});
			})
			.then(result3 => {
				let result = [];
				for (let i = 0; i < result3.length; i++)
					result.push(result3[i]["thumbImage"]);

				result = commonUtil.removeDuplicate(result, "thumb_url");
				result3 = [];
				for (let i in result) result3.push({thumbImage: result[i]});
				//result3 = [{thumbImage: result[0]}, {thumbImage: result[1]}];
				return [result3, self.downloadThumbImage];
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
							result2.bannerImage = bannerImage;
							resolve(result2);
						});
				})
				.catch(err => {
					console.log([
						bannerImage.banner_url,
						properties.url.bannerImage.referer
					]);
					reject(err);
				});
		});
	},
	downloadThumbImage: args => {
		let thumbImage =
			args.thumbImage != undefined ? args.thumbImage : args[0];
		return new Promise((resolve, reject) => {
			commonUtil
				.requestImage([
					thumbImage.thumb_url,
					properties.url.thumbImage.referer
				])
				.then(result => {
					return commonUtil
						.storeImageToBucket([
							result.body,
							"/thumb/" +
								result.req.path.substr(
									result.req.path.lastIndexOf("/") + 1
								),
							result.headers["content-type"],
							result,
							{
								toon_info_idx: commonUtil.sliceString(
									result.req.path,
									"/webtoon/",
									"/thumbnail/"
								)
							}
						])
						.then(result2 => {
							result2.thumbImage = thumbImage;
							resolve(result2);
						});
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	downloadImageList: args => {
		let list = args.list != undefined ? args.list : args[0];
		let func = args.func != undefined ? args.func : args[1];
		var promises = [];
		for (let i = 0; i < list.length; i++) {
			promises.push({
				func: data => {
					console.log(
						"[start ] :\t" + (i + 1) + "/" + list.length + ""
					);

					return new Promise(resolve => {
						resolve(func([data]));
					}).then(result => {
						console.log(
							"[finish] :\t" + (i + 1) + "/" + list.length + ""
						);
						return result;
					});
				},
				args: list[i][Object.keys(list[i])[0]]
			});
		}
		return commonUtil.promiseSeqOneSec(promises);
	}
};

module.exports = self;
