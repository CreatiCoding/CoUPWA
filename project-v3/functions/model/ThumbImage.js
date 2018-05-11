//썸네일 이미지
const commonUtil = require("../util/commonUtil");

const self = {
	instance: (ele, i) => {
		return {
			thumbImage: new self.Factory(
				commonUtil.sliceString(ele, "/thumbnail/", '" width="100%"'),
				commonUtil.sliceString(ele, '<img src="', '" width="100%"'),
				commonUtil.sliceString(
					ele,
					"thumb.comic.naver.net/webtoon/",
					"/thumbnail/"
				)
			)
		};
	},
	Factory: function ThumbImage(thumb_image_idx, thumb_url, toon_info_idx) {
		this.thumb_image_idx = thumb_image_idx;
		this.thumb_url = thumb_url;
		this.toon_info_idx = toon_info_idx;
	}
};
module.exports = self;
