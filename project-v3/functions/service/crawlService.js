const commonUtil = require("../common-util");
const properties = require("../properties.json");
const Toon = require("../model/Toon");
const ToonInfo = require("../model/ToonInfo");

const self = {
	/**
	 * crawlToon
	 * @param sort_type: ViewCount, Update, StarScore, TitleName
	 * @returns {*}
	 */
	crawlToon: sort_type => {
		sort_type = sort_type == undefined ? "ViewCount" : sort_type;
		return commonUtil
			.requestHTML([
				properties.url.crawlToon.value + "?order=" + sort_type,
				properties.url.crawlToon.referer
			])
			.then(result => {
				return commonUtil
					.crawlingHTMLArray([result, ".thumb"])
					.then(result2 => {
						return result2.map((i, ele) => {
							return Toon.instance(ele, i, sort_type);
						});
					});
			});
	},
	crawlToonInfo: week => {
		week =
			week == undefined
				? new Date()
						.toString()
						.substr(0, 3)
						.toLowerCase()
				: week;
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
	},
	everydayCrwalToon: () => {}
};

module.exports = self;
