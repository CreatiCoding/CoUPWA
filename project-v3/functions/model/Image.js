//웹툰 내용
module.exports = function Image(
	image_idx,
	image_type,
	file_idx,
	image_create_at,
	image_delete_at,
	options
) {
	this.image_idx = image_idx;
	this.image_type = image_type;
	this.file_idx = file_idx;
	this.toon_info_idx = toon_info_idx;
	this.image_create_at = image_create_at;
	this.image_delete_at = image_delete_at;
	this.options = options;
};
