import DetailRoute from "../routes/DetailRoute";
import indexedDBUtil from "../lib/indexedDBUtil";
import coupwaFetch from "../lib/coupwaFetch";
import commonUtil from "./commonUtil";
import db from "../lib/db";
import cacheUtil from "./cacheUtil";

const weekDay = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const self = {
	cacheToonList: toonInfoIdx => {
		let isCached;
		let data;
		return db
			.getToonList(toonInfoIdx)
			.then(r => {
				if (r) {
					isCached = true;
					return r.data;
				} else {
					isCached = false;
					return coupwaFetch.fetchToonList(toonInfoIdx);
				}
			})
			.then(r => {
				if (isCached) {
					return r;
				} else {
					data = r;
					return db.addToonList(toonInfoIdx, r);
				}
			})
			.then(r => (isCached ? r : data));
	},
	cacheViewBannerImage: YYMMDD => {
		let isCached;
		let data;
		return db
			.getViewBannerImage(YYMMDD)
			.then(r => {
				if (r) {
					isCached = true;
					return r.data;
				} else {
					isCached = false;
					return coupwaFetch.fetchViewBannerImage();
				}
			})
			.then(r => {
				if (isCached) {
					return r;
				} else {
					data = r;
					return db.addViewBannerImage(YYMMDD, r);
				}
			})
			.then(r => (isCached ? r : data));
	},
	cacheViewToon: (YYMMDD, sortType) => {
		let isCached;
		let data;
		return db
			.getViewToon(YYMMDD, sortType)
			.then(r => {
				if (r) {
					isCached = true;
					return r.data;
				} else {
					isCached = false;
					return coupwaFetch.fetchViewToon(sortType);
				}
			})
			.then(r => {
				if (isCached) {
					return r;
				} else {
					data = r;
					return db.addViewToon(YYMMDD, sortType, r);
				}
			})
			.then(r => (isCached ? r : data));
	},
	storeCacheThumb: r => {
		for (let i in r)
			for (let j in r[i]) {
				let path = r[i][j].image_path;
				cacheUtil.cacheImage(
					"$$$toolbox-cache$$$https://react-pwa-webtoon.firebaseapp.com/$$$",
					path,
					path.slice(path.lastIndexOf(".") + 1)
				);
			}
	},
	storeCacheBanner: r => {
		for (let i in r) {
			let path = r[i].banner_image_path;
			cacheUtil.cacheImage(
				"$$$toolbox-cache$$$https://react-pwa-webtoon.firebaseapp.com/$$$",
				path,
				path.slice(path.lastIndexOf(".") + 1)
			);
		}
	},
	isCachedViewBannerImage: () => {
		return indexedDBUtil
			.existsTable("coupwa", "viewBannerImage")
			.then(r => {
				if (!r) {
					return indexedDBUtil.createTable(
						"coupwa",
						"viewBannerImage",
						"key"
					);
				} else {
					return r;
				}
			})
			.then(r => {
				return indexedDBUtil.selectByKey(
					"coupwa",
					"viewBannerImage",
					commonUtil.getDateFormat("YYMMDD")
				);
			})
			.then(r => {
				if (!r || !r.result) return false;
				else return r;
			});
	},
	existsCacheViewBannerImage: () => {
		return indexedDBUtil
			.isNotExistCreateTable("coupwa", "viewBannerImage", "key")
			.then(r => {
				if (!r) return false;
				return indexedDBUtil.selectByKey(
					"coupwa",
					"viewBannerImage",
					commonUtil.getDateFormat("YYMMDD")
				);
			})
			.then(r => {
				if (!r) return false;
				else if (r.result !== undefined) {
					return false;
				}
				return true;
			});
	},
	storeCacheViewBannerImage: bool => {
		return Promise.resolve(bool)
			.then(r => {
				if (!r) return false;
				return coupwaFetch.fetchViewBannerImage();
			})
			.then(r => {
				if (!r) return false;
				return {
					key: commonUtil.getDateFormat("YYMMDD"),
					data: r
				};
			})
			.then(r => {
				if (!r) return false;
				return indexedDBUtil.insert("coupwa", "viewBannerImage", r);
			});
	},
	isCachedViewToon: sort_type => {
		return indexedDBUtil
			.existsTable("coupwa", "viewToon")
			.then(r => {
				if (!r) {
					return indexedDBUtil.createTable(
						"coupwa",
						"viewToon",
						"key"
					);
				} else {
					return r;
				}
			})
			.then(r => {
				return indexedDBUtil.selectByKey(
					"coupwa",
					"viewToon",
					commonUtil.getDateFormat("YYMMDD") + "_" + sort_type
				);
			})
			.then(r => {
				if (!r || !r.result) return false;
				else return r;
			});
	},
	existsCacheViewToon: () => {
		return indexedDBUtil
			.isNotExistCreateTable("coupwa", "viewToon", "key")
			.then(r => {
				if (!r) return false;
				return indexedDBUtil.selectByKey(
					"coupwa",
					"viewToon",
					commonUtil.getDateFormat("YYMMDD") +
						"_" +
						"ViewCount" +
						"_" +
						weekDay[0]
				);
			})
			.then(r => {
				if (!r) return false;
				else if (r.result !== undefined) {
					return false;
				}
				return true;
			});
	},
	storeCacheViewToonTrash: bool => {
		let result = [];
		return Promise.resolve(bool)
			.then(r => {
				if (!r) return false;
				return coupwaFetch.fetchViewToon("ViewCount");
			})
			.then(r => {
				if (!r) return false;
				result.push({
					key: commonUtil.getDateFormat("YYMMDD") + "_" + "ViewCount",
					data: r
				});
				return coupwaFetch.fetchViewToon("StarScore");
			})
			.then(r => {
				if (!r) return false;
				result.push({
					key: commonUtil.getDateFormat("YYMMDD") + "_" + "StarScore",
					data: r
				});
				return coupwaFetch.fetchViewToon("TitleName");
			})
			.then(r => {
				if (!r) return false;
				result.push({
					key: commonUtil.getDateFormat("YYMMDD") + "_" + "TitleName",
					data: r
				});
				return coupwaFetch.fetchViewToon("Update");
			})
			.then(r => {
				if (!r) return false;
				result.push({
					key: commonUtil.getDateFormat("YYMMDD") + "_" + "Update",
					data: r
				});
				return result;
			})
			.then(r => {
				if (!r) return false;
				return indexedDBUtil.insertList("coupwa", "viewToon", r);
			});
	}
};

export default self;
