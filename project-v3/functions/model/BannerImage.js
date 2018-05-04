//배너 이미지
const commonUtil = require("../util/commonUtil");

const self = {
	instance: (ele, i) => {
		return {
			bannerImage: new self.Factory(
				commonUtil.getDateFormat("YYYYMMDD") +
					(i > 99 ? i : i > 9 ? "0" + i : "00" + i),
				ele.bigImg[0],
				commonUtil.sliceString(ele.url[0], "titleId=", "&no=")
			)
		};
	},
	Factory: function BannerImage(banner_image_idx, banner_url, toon_info_idx) {
		this.banner_image_idx = banner_image_idx;
		this.banner_url = banner_url;
		this.toon_info_idx = toon_info_idx;
	}
};
module.exports = self;
