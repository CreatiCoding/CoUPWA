const commonUtil = require("../util/commonUtil");

//파일 정보
const self = {
	instance: (res, path, url) => {
		return {
			file: new self.Factory(
				res.req.path.substr(res.req.path.lastIndexOf("/") + 1),
				res.req.path.substr(res.req.path.lastIndexOf("/") + 1),
				path,
				url,
				res.headers["content-type"].slice(
					res.headers["content-type"].indexOf("/") + 1
				),
				new Date()
			)
		};
	},
	Factory: function File(
		file_idx,
		file_name,
		file_path,
		file_url,
		file_ext,
		file_create_at
	) {
		this.file_idx = file_idx;
		this.file_name = file_name;
		this.file_path = file_path;
		this.file_url = file_url;
		this.file_ext = file_ext;
		this.file_create_at = file_create_at;
	}
};
module.exports = self;
