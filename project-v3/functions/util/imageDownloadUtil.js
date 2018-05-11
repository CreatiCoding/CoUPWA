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
				return new Promise((resolve, reject) => {
					xmlParser.parseString(result, (err, result2) => {
						if (err) {
							reject(err);
						} else {
							resolve(result2);
						}
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
		let week = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
		let promises = [];
		for (let i = 0; i < 7; i++) {
			let resultHTML;
			promises.push(
				commonUtil
					.requestHTML([
						properties.url.thumbImageList.value + week[i],
						properties.url.thumbImageList.referer
					])
					.then(result => {
						resultHTML = result;
						if ((result.match(/class="lst/g) || []).length >= 30) {
							return commonUtil.requestHTML([
								properties.url.thumbImageList.value +
									week[i] +
									"&page=2",
								properties.url.thumbImageList.referer
							]);
						} else {
							return true;
						}
					})
					.then(result2 => {
						if (result2 !== true) {
							let a = commonUtil.sliceString(
								resultHTML,
								'class="toon_name"><strong>',
								"</strong></span>"
							);
							let b = commonUtil.sliceString(
								result2,
								'class="toon_name"><strong>',
								"</strong></span>"
							);
							if (a === b) {
								return resultHTML;
							} else {
								resultHTML = resultHTML + result2;
								return resultHTML;
							}
						} else {
							return resultHTML;
						}
					})
					.then(result => {
						return commonUtil.crawlingHTMLArray([result, ".lst"]);
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

						result = commonUtil.removeDuplicate(
							result,
							"thumb_url"
						);
						result3 = [];
						for (let i in result)
							result3.push({thumbImage: result[i]});
						//result3 = [{thumbImage: result[0]}, {thumbImage: result[1]}];
						return result3;
					})
			);
		}
		return Promise.all(promises)
			.then(result => {
				let resultArr = [];
				result.map((ele, i) => {
					return ele.map((eele, j) => {
						return resultArr.push(eele.thumbImage);
					});
				});
				resultArr = commonUtil
					.removeDuplicate(resultArr, "thumb_image_idx")
					.map(ele => {
						return {
							thumbImage: ele
						};
					});
				return resultArr;
			})
			.then(result2 => {
				return [result2, self.downloadThumbImage];
			});
		// return [result3, self.downloadThumbImage];
	},
	downloadBannerImage: args => {
		let bannerImage =
			args.bannerImage !== undefined ? args.bannerImage : args[0];
		return new Promise((resolve, reject) => {
			return commonUtil
				.requestImage([
					bannerImage.banner_url,
					properties.url.bannerImage.referer
				])
				.then(result => {
					return commonUtil.storeImageToBucket([
						result.body,
						"/banner/" +
							result.req.path.substr(
								result.req.path.lastIndexOf("/") + 1
							),
						result.headers["content-type"],
						result,
						{}
					]);
				})
				.catch(err => {
					console.log([
						bannerImage.banner_url,
						properties.url.bannerImage.referer
					]);
					reject(err);
				})
				.then(result2 => {
					result2["bannerImage"] = bannerImage;
					return resolve(result2);
				});
		});
	},
	downloadThumbImage: args => {
		let thumbImage =
			args.thumbImage !== undefined ? args.thumbImage : args[0];
		return new Promise((resolve, reject) => {
			return commonUtil
				.requestImage([
					thumbImage.thumb_url,
					properties.url.thumbImage.referer
				])
				.then(result => {
					return commonUtil.storeImageToBucket([
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
					]);
				})
				.catch(err => {
					reject(err);
				})
				.then(result2 => {
					result2["thumbImage"] = thumbImage;
					return resolve(result2);
				});
		});
	},
	downloadImageList: args => {
		let list = args.list !== undefined ? args.list : args[0];
		let func = args.func !== undefined ? args.func : args[1];
		var promises = [];
		var funcFactory = args => {
			console.log(
				"[start ] :\t" + (args.time + 1) + "/" + String(list.length)
			);

			return new Promise(resolve => {
				resolve(func([args.data]));
			}).then(result => {
				console.log(
					"[finish] :\t" + (args.time + 1) + "/" + String(list.length)
				);
				return result;
			});
		};
		for (let i = 0; i < list.length; i++) {
			promises.push({
				func: funcFactory,
				args: {
					data: list[i][Object.keys(list[i])[0]],
					time: i
				}
			});
		}
		return commonUtil.promiseSeqOneSec(promises);
	}
};

module.exports = self;
