const commonUtil = require("./commonUtil");
const properties = require("../properties.json");
const Toon = require("../model/Toon");
const ToonInfo = require("../model/ToonInfo");

const self = {
	/**
	 * crawlToon
	 * @param sortType: ViewCount, Update, StarScore, TitleName
	 * @returns {*}
	 */
	crawlToon: sortType => {
		sortType = sortType == undefined ? "ViewCount" : sortType;
		return commonUtil
			.requestHTML([
				properties.url.crawlToon.value + "?order=" + sortType,
				properties.url.crawlToon.referer
			])
			.then(result => {
				return commonUtil
					.crawlingHTMLArray([result, ".thumb"])
					.then(result2 => {
						return result2.map((i, ele) => {
							return Toon.instance(ele, i + 1, sortType);
						});
					});
			});
	},
	crawlToonInfo: week => {
		week = week == undefined ? commonUtil.getDateFormat("eee") : week;
		return commonUtil
			.requestHTML([
				properties.url.crawlToonInfo.value + week,
				properties.url.crawlToonInfo.value.referer
			])
			.then(result => {
				return commonUtil
					.crawlingHTMLArray([result, ".lst"])
					.then(result2 => {
						return result2.map((i, ele) => {
							return ToonInfo.instance(ele);
						});
					});
			});
	}
};

module.exports = self;
