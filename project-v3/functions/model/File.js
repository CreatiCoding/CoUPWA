//파일 정보
module.exports = function File(
	file_idx,
	file_name,
	file_path,
	//file_url,
	file_ext
) {
	this.file_idx = file_idx;
	this.file_name = file_name;
	this.file_path = file_path;
	//this.file_url = file_url;
	this.file_ext = file_ext;
	this.file_create_at = new Date().getTime();
};
