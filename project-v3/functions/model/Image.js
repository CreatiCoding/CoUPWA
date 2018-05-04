const commonUtil = require("../util/commonUtil");
//이미지 정보
const self = {
	instance: (res, options) => {
		return {
			image: new self.Factory(
				res.req.path.substr(res.req.path.lastIndexOf("/") + 1),
				res.headers["content-type"],
				commonUtil.getDateFormat("DATE"),
				options
			)
		};
	},
	Factory: function Image(image_idx, image_type, image_create_at, options) {
		this.image_idx = image_idx;
		this.image_type = image_type;
		this.image_create_at = image_create_at;
		this.image_delete_at = undefined;
		this.options = options;
	}
};
module.exports = self;
