const commonUtil = require("../common-util");

//웹툰 정보
const self = {
	instance: ele => {
		return {
			toon_info_idx: commonUtil
				.sliceString(ele, "titleId=", "&amp;")
				.trim(),
			toon_info_name: commonUtil.strCodePoint(
				commonUtil.sliceString(ele, "<strong>", "</strong>").trim()
			),
			toon_info_author: commonUtil.strCodePoint(
				commonUtil
					.sliceString(
						ele,
						's="sub_info">',
						"</p>\n\t\t\t\t\t\t\t\t<div"
					)
					.trim()
			),
			toon_info_star: commonUtil
				.sliceString(
					ele,
					'xt_score">',
					'</span>\n\t\t\t\t\t\t\t\t\t<span class="if1'
				)
				.trim(),
			toon_info_update: ele.indexOf("badge badge_up") != -1,
			toon_info_update_at: commonUtil
				.sliceStr(
					ele,
					'"if1">\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t',
					8
				)
				.trim()
		};
	},
	Object: function ToonInfo(
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
