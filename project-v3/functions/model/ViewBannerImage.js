const commonUtil = require("../util/commonUtil");

//웹툰 정보
const self = {
	instance: (bannerImages, files) => {
		let list = [];
		for (let i = 0; i < bannerImages.length; i++) {
			const file = files.filter(
				ele => ele.key === bannerImages[i].key
			)[0];
			list.push(self.innerInstance(bannerImages[i], file));
		}
		return {
			viewBannerImage: new self.Factory(
				commonUtil.getDateFormat("YYMMDD"),
				list
			)
		};
	},
	innerInstance: (bannerImage, file) => {
		return new self.innerFactory(
			bannerImage.data.toon_info_idx,
			file.data.file_path,
			bannerImage.data.toon_info_idx + "_test_url",
			bannerImage.data.toon_info_idx + "의 배너 이미지"
		);
	},
	Factory: function ViewBannerImage(
		view_banner_image_idx,
		view_banner_image_list
	) {
		this.view_banner_image_idx = view_banner_image_idx;
		this.view_banner_image_list = view_banner_image_list;
	},
	innerFactory: function ViewBannerImageData(
		toon_info_idx,
		banner_image_path,
		banner_image_href,
		banner_image_alt
	) {
		this.toon_info_idx = toon_info_idx;
		this.banner_image_path = banner_image_path;
		this.banner_image_href = banner_image_href;
		this.banner_image_alt = banner_image_alt;
	}
};
module.exports = self;
