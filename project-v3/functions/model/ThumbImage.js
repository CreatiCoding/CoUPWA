//썸네일 이미지
const commonUtil = require("../util/commonUtil");

const self = {
	instance: (ele, i) => {
		return {
			thumbImage: new self.Factory(
				commonUtil.getDateFormat("YYYYMMDD") +
					(i > 99 ? i : i > 9 ? "0" + i : "00" + i),
				commonUtil.sliceString(
					ele,
					'&apos;" src="',
					'" width="83" hei'
				),
				commonUtil.sliceString(
					ele,
					"ic.naver.net/webtoon/",
					"/thumbnail/"
				)
			)
		};
	},
	Factory: function ThumbImage(thumb_idx, thumb_url, toon_info_idx) {
		this.thumb_image_idx = thumb_idx;
		this.thumb_url = thumb_url;
		this.toon_info_idx = toon_info_idx;
	}
};
module.exports = self;
