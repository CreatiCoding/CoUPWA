const Toon = require("../model/Toon");
const ToonInfo = require("../model/ToonInfo");
const commonUtil = require("./commonUtil");
const properties = require("../properties");
const ToonList = require("../model/ToonList");

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
	},

	doCrwalingToonList: toon_info_idx => {
		let nextPage = 1;
		let htmlCode = [];
		let preName = "";
		let resultList = [];
		let first_page = "";
		let requestHtml = (idx, page) => {
			return commonUtil
				.requestHTML([
					properties.url.toonList.value +
						idx +
						"&page=" +
						String(page),
					properties.url.toonList.referer
				])
				.then(r => {
					if (first_page === "") {
						first_page = r;
					}
					htmlCode.push(r);
					return r;
				})
				.catch(err => {
					console.log(toon_info_idx, err);
				});
		};

		let htmlToArray = (result, selector) => {
			if (result.indexOf("연령 확인") !== -1)
				return Promise.resolve().then(() => []);
			return commonUtil
				.crawlingHTMLArray([result, selector])
				.catch(err => {
					console.log(toon_info_idx, "@@@@@@@@", err);
				});
		};

		let print = (name, result) => {
			console.log(name, result);
			return result;
		};

		let getFirstToonName = r => {
			return htmlToArray(r, ".lst .toon_name").then(r => {
				if (r.length === 0) return "19금 웹툰";
				return r[0];
			});
		};

		let checkEndPoint = r => {
			if (preName === r) {
				htmlCode.pop();
				nextPage--;
				return false;
			} else {
				preName = r;
				return true;
			}
		};

		let resolver = () => {
			return Promise.resolve()
				.then(() => requestHtml(toon_info_idx, nextPage++))
				.then(r => getFirstToonName(r))
				.then(r => checkEndPoint(r))
				.then(isContinue => {
					if (isContinue) return resolver();
					else return false;
				});
		};

		let arrToList = () => {
			let promises = [];
			for (let i = 0; i < htmlCode.length; i++) {
				promises.push(
					htmlToArray(htmlCode[i], ".lst").then(r => {
						for (let j = 0; j < r.length; j++) {
							let htmlData = commonUtil.strCodePoint(r[j].trim());
							resultList.push(htmlData);
						}
						return r;
					})
				);
			}
			return Promise.all(promises);
		};

		let exceptNotFree = () => {
			resultList = resultList.filter(
				ele => ele.indexOf('class="blind">') === -1
			);
		};
		return Promise.resolve()
			.then(resolver)
			.then(arrToList)
			.then(exceptNotFree)
			.then(() => {
				return ToonList.instance(toon_info_idx, first_page, resultList);
			});
	}
};

module.exports = self;
