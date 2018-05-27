const firestoreUtil = require("../util/firestoreUtil");
const ViewToon = require("../model/ViewToon");
const ViewBannerImage = require("../model/ViewBannerImage");
const toonInfoService = require("../service/ToonInfoService");
const toonService = require("../service/ToonService");
const bannerImageService = require("../service/BannerImageService");
const thumbImageService = require("../service/ThumbImageService");
const commonUtil = require("../util/commonUtil");
const crwalingUtil = require("../util/crawlingUtil");

const self = {
	resetList: () => {
		return firestoreUtil.reset(["toonList"]);
	},
	todayList: () => {
		return firestoreUtil
			.selectList("toonInfo")
			.then(result => {
				return result.map(ele => {
					return {
						func: crwalingUtil.doCrwalingToonList,
						args: ele.toon_info_idx
					};
				});
			})
			.then(r => commonUtil.promiseSeqOneSec(r))
			.then(r => {
				console.log(r);
				return r.map(ele => {
					return {
						key: ele.toonList.toon_info_idx,
						model: "toonList",
						data: ele.toonList
					};
				});
			})
			.then(r => firestoreUtil.insert(r));
	},
	resetMain: () => {
		return firestoreUtil.reset([
			"image",
			"file",
			"thumbImage",
			"bannerImage",
			"toon",
			"toonInfo",
			"viewToon",
			"viewBannerImage"
		]);
	},
	todayMain: () => {
		return self.todayMainCrawl().then(result => {
			console.log(result);
			return self.todayMainInsert(result);
		});
	},
	todayMainCrawl: () => {
		let promises = [
			toonInfoService.createToonInfoToday(),
			toonService.createToonToday(),
			thumbImageService.createThumbImageToday(),
			bannerImageService.createBannerImageToday()
		];
		return Promise.all(promises);
	},
	todayMainInsert: param => {
		let promises = [];
		console.log(param);
		promises.push(self.todayViewToon(param));
		promises.push(self.todayBannerImage(param[3]));
		return Promise.all(promises);
	},
	todayViewToon: param => {
		let resultArr = [];
		const sortTypes = ["Update", "ViewCount", "StarScore", "TitleName"];
		const weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
		const toonInfos = param[0];
		const toons = param[1];
		const thumbImages = param[2].filter(ele => ele.model === "thumbImage");
		const files = param[2].filter(ele => ele.model === "file");

		for (let s = 0; s < sortTypes.length; s++) {
			for (let w = 0; w < weekDays.length; w++) {
				resultArr.push(
					ViewToon.instance(
						toons.filter(ele => {
							return (
								ele.data.toon_sort_type === sortTypes[s] &&
								ele.data.toon_week_day === weekDays[w]
							);
						}),
						toonInfos,
						thumbImages,
						files
					)
				);
			}
		}
		resultArr = firestoreUtil.convertObjs2Doc(resultArr);
		return firestoreUtil.insert(resultArr);
	},
	todayBannerImage: param => {
		const bannerImages = param.filter(ele => ele.model === "bannerImage");
		const files = param.filter(ele => ele.model === "file");
		let result = ViewBannerImage.instance(bannerImages, files);
		result = firestoreUtil.convertObjs2Doc([result]);
		return firestoreUtil.insert(result);
	}
};

module.exports = self;
