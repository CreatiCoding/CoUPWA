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
		sortType = sortType === undefined ? "ViewCount" : sortType;
		return commonUtil
			.requestHTML([
				properties.url.crawlToon.value + "?order=" + sortType,
				properties.url.crawlToon.referer
			])
			.then(result => {
				return commonUtil.crawlingHTMLArray([result, ".thumb"]);
			})
			.then(result2 => {
				return result2.map((i, ele) => {
					return Toon.instance(ele, i + 1, sortType);
				});
			});
	},
	crawlToonInfo: week => {
		week = week === undefined ? commonUtil.getDateFormat("eee") : week;
		let resultHTML;
		return commonUtil
			.requestHTML([
				properties.url.crawlToonInfo.value + week,
				properties.url.crawlToonInfo.value.referer
			])
			.then(result => {
				resultHTML = result;
				if ((result.match(/class="lst/g) || []).length >= 30) {
					return commonUtil.requestHTML([
						properties.url.crawlToonInfo.value + week + "&page=2",
						properties.url.crawlToonInfo.value.referer
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
			.then(result3 => {
				return commonUtil.crawlingHTMLArray([result3, ".lst"]);
			})
			.then(result4 => {
				return result4.map((i, ele) => {
					return ToonInfo.instance(ele);
				});
			});
	}
};

module.exports = self;
