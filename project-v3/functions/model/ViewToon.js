const commonUtil = require("../util/commonUtil");

//웹툰 정보
const self = {
	instance: ele => {
		return {
			ViewInfo: new self.Factory()
		};
	},
	Factory: function ViewInfo(view_info_idx, view_info_list) {
		this.view_info_idx = view_info_idx;
		this.view_info_list = view_info_list;
	},
	FactoryData: function ViewInfoData(
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
