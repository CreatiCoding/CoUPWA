const commonUtil = require("../util/commonUtil");

//웹툰 정보
const self = {
	instance: (toon_info_idx, first_page, data_list) => {
		let toon_info_title_name = commonUtil
			.sliceString(
				first_page,
				'<span class="title"><strong>',
				"</strong></span>"
			)
			.trim();
		let toon_info_author = commonUtil
			.sliceString(
				first_page,
				"<a href=\"#\" class=\"nm\" onclick=\"nclk(this, 'LIC.artist', '', '')\">",
				"</a>\r\n\t\t\t\t</dd>\r\n\t\t\t\t<dd c"
			)
			.trim();
		let toon_info_intro = commonUtil
			.sliceString(
				first_page,
				'</dd>\r\n\t\t\t\t<dd class="info_cont">',
				"</dd>\r\n\t\t\t</dl>\r\n\t\t</div>"
			)
			.trim();
		let toon_info_thumb = commonUtil.sliceString(
			first_page,
			"background-image:url(",
			');">\r\n\t\t\t\r\n\t'
		);
		return {
			toonList: new self.Factory(
				toon_info_idx,
				toon_info_title_name,
				toon_info_author.replace(
					"</a><a href=\"#\" class=\"nm\" onclick=\"nclk(this, 'LIC.artist', '', '')\">",
					" / "
				),
				toon_info_intro,
				toon_info_thumb,
				data_list.length,
				self.innerInstance(data_list)
			)
		};
	},
	innerInstance: data_list => {
		return data_list.map((ele, seq, arr) => {
			return new self.innerFactory(
				seq + 1,
				commonUtil
					.sliceString(
						ele,
						'<span class="toon_name"><strong>',
						"</strong></span>"
					)
					.trim()
					.replace(/&gt;/gi, ">")
					.replace(/&lt;/gi, "<"),
				commonUtil.sliceStr(ele, '<span class="txt_score">', 4).trim(),

				commonUtil
					.sliceString(
						ele,
						'<img src="',
						'" width="100%" height="100%" '
					)
					.trim(),
				commonUtil
					.sliceString(
						ele,
						'height="100%" alt="',
						'"></span>\n\t\t\t\t\t\t\t\t<div'
					)
					.trim()
					.replace(/&gt;/gi, ">")
					.replace(/&lt;/gi, "<"),
				ele.indexOf('"ico_badge">UP</span>') !== -1 ? true : false,

				commonUtil.sliceStr(ele, '<span class="if1">', 8).trim()
			);
		});
	},
	Factory: function ToonList(
		toon_info_idx,
		toon_info_title_name,
		toon_info_author,
		toon_info_intro,
		toon_info_thumb,
		toon_info_count,
		data_list
	) {
		this.toon_info_idx = toon_info_idx;
		this.toon_info_title_name = toon_info_title_name;
		this.toon_info_author = toon_info_author;
		this.toon_info_intro = toon_info_intro;
		this.toon_info_thumb = toon_info_thumb;
		this.toon_info_count = toon_info_count;
		this.toonListData = data_list;
	},
	innerFactory: function ToonData(
		toon_data_idx,
		toon_data_name,
		toon_data_star,
		toon_data_thumb,
		toon_data_thumb_alt,
		toon_data_update,
		toon_data_update_at
	) {
		this.toon_data_idx = toon_data_idx;
		this.toon_data_name = toon_data_name;
		this.toon_data_star = toon_data_star;
		this.toon_data_thumb = toon_data_thumb;
		this.toon_data_thumb_alt = toon_data_thumb_alt;
		this.toon_data_update = toon_data_update;
		this.toon_data_update_at = toon_data_update_at;
	}
};
module.exports = self;
