const commonUtil = require("../common-util");
const properties = require("../properties.json");
const Toon = require("../model/Toon");
const ToonInfo = require("../model/ToonInfo");
const crawlService = require("../service/crawlService");
const imageDownloader = require("../service/imageDownloader");
const ThumbImage = require("../model/ThumbImage");

let fs = undefined;
if (process.argv[2] != undefined) {
	fs = require("../service/firestoreService");
}
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
					0 + "" + a.slice(a.indexOf("&#x") + 2, a.indexOf("&#x") + 7)
				)
			) +
			a.slice(a.indexOf("&#x") + 8);
	}
	return a;
}

const self = {
	processThumbImageList: () => {
		return imageDownloader
			.crawlThumbImage()
			.then(result => imageDownloader.downloadImageList(result))
			.then(result2 => {
				let arr = [];

				result2.map(ele => {
					console.log(ele);
					for (let key in ele) {
						// 인덱스 이름의 컬럼의 값은 /라는 문자를 _로 바꾸어 저장한다.
						// 파이어스토어의 path 혼동 방지용
						// 키값을 이용하여 인덱스이름을 구해내고 그 값을 바꿈.

						let idxName = "";
						key.split("").map((e, i) => {
							if (e !== e.toLowerCase())
								idxName += "_" + e.toLowerCase();
							else idxName += e;
						});
						idxName += "_idx";
						ele[key][idxName] = ele[key][idxName].replace(
							/\//gi,
							"_"
						);
						// fs.collection(model).doc(key) <- data 넣을 데이터
						arr.push({
							model: key,
							key: ele[key][idxName],
							data: ele[key]
						});
					}
				});
				return fs.insert(arr);
			});
	}
};

module.exports = self;
