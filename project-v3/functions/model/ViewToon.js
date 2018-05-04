const commonUtil = require("../util/commonUtil");

//웹툰 정보
const self = {
	instance: (toonInfo, thumbImage, sortType) => {
		return {
			ViewToon: new self.Factory(
				commonUtil.getDateFormat("YYMMDD_eee_") + sortType[0],
				data[1].map((ele, i) => {
					return new self.FactoryData(
						data[2],
						data[3],
						data[4],
						data[5],
						data[6],
						data[7]
					);
				})
			)
		};
	},
	Factory: function ViewToon(view_toon_idx, view_toon_list) {
		this.view_toon_idx = view_toon_idx;
		this.view_toon_list = view_toon_list;
	},
	FactoryData: function ViewToonData(
		toon_info_name,
		toon_info_star,
		toon_info_author,
		toon_info_update,
		image_path,
		image_alt
	) {
		this.toon_info_name = toon_info_name;
		this.toon_info_star = toon_info_star;
		this.toon_info_author = toon_info_author;
		this.toon_info_update = toon_info_update;
		this.image_path = image_path;
		this.image_alt = image_alt;
	}
};
module.exports = self;
