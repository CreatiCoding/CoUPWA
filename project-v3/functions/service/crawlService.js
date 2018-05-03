const commonUtil = require("../common-util");
const properties = require("../properties.json");
const Toon = require("../model/Toon");
const ToonInfo = require("../model/ToonInfo");

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
				parseInt(
					"0" + a.slice(a.indexOf("&#x") + 2, a.indexOf("&#x") + 7)
				)
			) +
			a.slice(a.indexOf("&#x") + 8);
	}
	return a;
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
				properties.url.crawlToon.value + "?order=" + sort_type,
				properties.url.crawlToon.referer
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
								sliceString(ele, "weekday=", '" onclick'),
								i,
								sliceString(ele, "titleId=", "&amp;")
							);
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
							return new ToonInfo(
								sliceString(ele, "titleId=", "&amp;").trim(),
								strCodePoint(
									sliceString(
										ele,
										"<strong>",
										"</strong>"
									).trim()
								),
								strCodePoint(
									sliceString(
										ele,
										's="sub_info">',
										"</p>\n\t\t\t\t\t\t\t\t<div"
									).trim()
								),
								sliceString(
									ele,
									'xt_score">',
									'</span>\n\t\t\t\t\t\t\t\t\t<span class="if1'
								).trim(),
								ele.indexOf("badge badge_up") != -1,
								sliceStr(
									ele,
									'"if1">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t',
									8
								).trim()
							);
						});
					});
			});
	},
	everydayCrwalToon: () => {}
};

module.exports = self;
