const commonUtil = require("../util/commonUtil");

//웹툰 정보
const self = {
	instance: ele => {
		return {
			toonInfo: new self.Class(
				commonUtil.sliceString(ele, "titleId=", "&amp;").trim(),
				commonUtil.strCodePoint(
					commonUtil.sliceString(ele, "<strong>", "</strong>").trim()
				),
				commonUtil.strCodePoint(
					commonUtil
						.sliceString(
							ele,
							's="sub_info">',
							"</p>\n\t\t\t\t\t\t\t\t<div"
						)
						.trim()
				),
				commonUtil
					.sliceString(
						ele,
						'xt_score">',
						'</span>\n\t\t\t\t\t\t\t\t\t<span class="if1'
					)
					.trim(),
				ele.indexOf("badge badge_up") != -1,
				commonUtil
					.sliceStr(
						ele,
						'"if1">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t',
						8
					)
					.trim()
			)
		};
	},
	Class: function ToonInfo(
		toon_info_idx,
		toon_info_name,
		toon_info_author,
		toon_info_star,
		toon_info_update,
		toon_info_update_at
	) {
		this.toon_info_idx = toon_info_idx;
		this.toon_info_name = toon_info_name;
		this.toon_info_author = toon_info_author;
		this.toon_info_star = toon_info_star;
		this.toon_info_update = toon_info_update;
		this.toon_info_update_at = toon_info_update_at;
	}
};
module.exports = self;
