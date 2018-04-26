const commonUtil = require("../common-util");
const properties = require("../properties.json");
const Toon = require("../model/Toon");

function sliceStr(b, c, d) {
	return b.substring(b.indexOf(c) + c.length, b.indexOf(d));
}
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
				properties.service.collectToonInfo.mainUrl.value +
					"?order=" +
					sort_type,
				properties.service.collectToonInfo.mainUrl.referer
			])
			.then(result => {
				return commonUtil
					.crawlingHTMLArray([result, ".thumb"])
					.then(result2 => {
						return result2.map((i, ele) => {
							return new Toon(
								"" +
									new Date()
										.toISOString()
										.substr(0, 10)
										.replace(/-/gi, "") +
									"" +
									(i > 99 ? i : i > 9 ? "0" + i : "00" + i),
								sort_type,
								sliceStr(ele, "weekday=", '" onclick'),
								i,
								sliceStr(ele, "titleId=", "&amp;")
							);
						});
					});
			});
	}
};

module.exports = self;
