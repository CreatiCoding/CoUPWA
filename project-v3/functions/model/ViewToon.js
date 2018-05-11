const commonUtil = require("../util/commonUtil");

//웹툰 정보
const self = {
	instance: (toons, toonInfos, thumbImages, files) => {
		let list = [];
		for (let i = 0; i < toons.length; i++) {
			let thumbImage = thumbImages.filter(
				ele => toons[i].data.toon_info_idx === ele.data.toon_info_idx
			);
			if (thumbImage[0] !== undefined) {
				thumbImage = thumbImage[0];
			}
			list.push(
				self.innerInstance(
					toons[i],
					toonInfos.filter(
						ele => toons[i].data.toon_info_idx === ele.key
					)[0],
					files.filter(ele => thumbImage.key === ele.key)[0]
				)
			);
		}
		return {
			viewToon: new self.Factory(
				commonUtil.getDateFormat("YYMMDD") +
					"_" +
					toons[0].data.toon_sort_type +
					"_" +
					toons[0].data.toon_week_day,
				list
			)
		};
	},
	innerInstance: (toon, toonInfo, file) => {
		return new self.innerFactory(
			toonInfo.data.toon_info_name,
			toonInfo.data.toon_info_star,
			toonInfo.data.toon_info_author,
			toonInfo.data.toon_info_update,
			toonInfo.data.toon_info_idx,
			file.data.file_path,
			"/list/" + toonInfo.data.toon_info_idx,
			toonInfo.data.toon_info_name + "의 썸네일 이미지"
		);
	},
	Factory: function ViewToon(view_toon_idx, view_toon_list) {
		this.view_toon_idx = view_toon_idx;
		this.view_toon_list = view_toon_list;
	},
	innerFactory: function ViewToonData(
		toon_info_name,
		toon_info_star,
		toon_info_author,
		toon_info_update,
		toon_info_idx,
		image_path,
		image_href,
		image_alt
	) {
		this.toon_info_name = toon_info_name;
		this.toon_info_star = toon_info_star;
		this.toon_info_author = toon_info_author;
		this.toon_info_update = toon_info_update;
		this.toon_info_idx = toon_info_idx;
		this.image_path =
			"https://storage.googleapis.com/react-pwa-webtoon" + image_path;
		this.image_href = image_href;
		this.image_alt = image_alt;
	}
};
module.exports = self;
