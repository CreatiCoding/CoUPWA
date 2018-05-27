import Dexie from "dexie";
import commonUtil from "./commonUtil";

const self = {
	db: new Dexie("coupwa"),
	getViewBannerImage: YYMMDD => {
		return self.db
			.table("viewBannerImage")
			.get(YYMMDD)
			.then(r => {
				return r;
			});
	},
	getViewToon: (YYMMDD, sortType) => {
		return self.db
			.table("viewToon")
			.get([YYMMDD, sortType])
			.then(r => {
				return r;
			});
	},
	getToonList: toonInfoIdx => {
		return self.db
			.table("toonList")
			.get(toonInfoIdx)
			.then(r => {
				return r;
			});
	},
	addViewToon: (YYMMDD, sortType, data) => {
		return self.db
			.table("viewToon")
			.add({
				YYMMDD: YYMMDD,
				sortType: sortType,
				data: data
			})
			.catch(e => {
				return data;
			})
			.then(r => {
				if (r.length === 2) {
					return data;
				} else {
					return undefined;
				}
			});
	},
	addViewBannerImage: (YYMMDD, data) => {
		return self.db
			.table("viewBannerImage")
			.add({
				YYMMDD: YYMMDD,
				data: data
			})
			.catch(e => {
				console.log("It already exists.");
			});
	},
	addToonList: (toonInfoIdx, data) => {
		return self.db
			.table("toonList")
			.add({
				toonInfoIdx: toonInfoIdx,
				data: data
			})
			.catch(e => {
				console.log("It already exists.");
			});
	}
};

self.db.version(4).stores({
	viewToon: "[YYMMDD+sortType]",
	viewBannerImage: "YYMMDD",
	toonList: "toonInfoIdx"
});

export default self;
